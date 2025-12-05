using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Threading;
using System.Threading.Tasks;

namespace NetworkScanner
{
    /// <summary>
    /// Core network scanning service implementing various scan types
    /// </summary>
    public class NetworkScannerService
    {
        private readonly PortServiceMapper _serviceMapper;
        private const int MaxConcurrentScans = 100;

        public NetworkScannerService()
        {
            _serviceMapper = new PortServiceMapper();
        }

        /// <summary>
        /// Performs a network scan on the specified target
        /// </summary>
        /// <param name="target">Target host, IP, or IP range</param>
        /// <param name="ports">Array of ports to scan</param>
        /// <param name="timeout">Timeout in milliseconds</param>
        /// <param name="progress">Progress reporter</param>
        /// <param name="cancellationToken">Cancellation token</param>
        public async Task ScanAsync(
            string target, 
            int[] ports, 
            int timeout, 
            IProgress<ScanProgress> progress,
            CancellationToken cancellationToken)
        {
            var hosts = ParseTargets(target);
            var totalOperations = hosts.Count * (ports.Length > 0 ? ports.Length : 1);
            var completedOperations = 0;

            foreach (var host in hosts)
            {
                cancellationToken.ThrowIfCancellationRequested();

                // Perform ping test first
                var pingResult = await PingHostAsync(host, timeout, cancellationToken);
                
                if (!pingResult.IsReachable && ports.Length > 0)
                {
                    progress.Report(new ScanProgress
                    {
                        PercentComplete = (double)++completedOperations / totalOperations * 100,
                        StatusMessage = $"Host {host} appears to be down or blocking ICMP",
                        Result = new ScanResult
                        {
                            Host = host,
                            Port = 0,
                            Status = "Down",
                            Service = "N/A",
                            ResponseTime = pingResult.ResponseTime,
                            Details = "Host unreachable or not responding to ping"
                        }
                    });
                    continue;
                }

                // If ping sweep only, report and continue
                if (ports.Length == 0)
                {
                    progress.Report(new ScanProgress
                    {
                        PercentComplete = (double)++completedOperations / totalOperations * 100,
                        StatusMessage = $"Host {host} is {(pingResult.IsReachable ? "up" : "down")}",
                        Result = new ScanResult
                        {
                            Host = host,
                            Port = 0,
                            Status = pingResult.IsReachable ? "Up" : "Down",
                            Service = "ICMP",
                            ResponseTime = pingResult.ResponseTime,
                            Details = pingResult.IsReachable ? "Host is reachable" : "Host is not reachable"
                        }
                    });
                    continue;
                }

                // Scan ports with throttling
                var semaphore = new SemaphoreSlim(MaxConcurrentScans);
                var scanTasks = ports.Select(async port =>
                {
                    await semaphore.WaitAsync(cancellationToken);
                    try
                    {
                        var result = await ScanPortAsync(host, port, timeout, cancellationToken);
                        
                        var completed = Interlocked.Increment(ref completedOperations);
                        progress.Report(new ScanProgress
                        {
                            PercentComplete = (double)completed / totalOperations * 100,
                            StatusMessage = $"Scanning {host}:{port}...",
                            Result = result
                        });
                    }
                    finally
                    {
                        semaphore.Release();
                    }
                });

                await Task.WhenAll(scanTasks);
            }
        }

        /// <summary>
        /// Scans a specific port on a host
        /// </summary>
        private async Task<ScanResult> ScanPortAsync(
            string host, 
            int port, 
            int timeout,
            CancellationToken cancellationToken)
        {
            var stopwatch = Stopwatch.StartNew();
            var result = new ScanResult
            {
                Host = host,
                Port = port,
                Service = _serviceMapper.GetServiceName(port)
            };

            try
            {
                using var client = new TcpClient();
                var connectTask = client.ConnectAsync(host, port);
                var timeoutTask = Task.Delay(timeout, cancellationToken);

                var completedTask = await Task.WhenAny(connectTask, timeoutTask);

                if (completedTask == connectTask && !connectTask.IsFaulted)
                {
                    result.Status = "Open";
                    result.ResponseTime = stopwatch.ElapsedMilliseconds;
                    result.Details = $"Port is open and accepting connections";

                    // Try to grab banner
                    try
                    {
                        var banner = await GrabBannerAsync(client, cancellationToken);
                        if (!string.IsNullOrWhiteSpace(banner))
                        {
                            result.Details += $" | Banner: {banner}";
                        }
                    }
                    catch
                    {
                        // Banner grab failed, not critical
                    }
                }
                else if (connectTask.IsFaulted)
                {
                    result.Status = "Closed";
                    result.ResponseTime = stopwatch.ElapsedMilliseconds;
                    result.Details = "Connection refused";
                }
                else
                {
                    result.Status = "Filtered";
                    result.ResponseTime = timeout;
                    result.Details = "Connection timed out - port may be filtered";
                }
            }
            catch (SocketException ex)
            {
                result.Status = "Closed";
                result.ResponseTime = stopwatch.ElapsedMilliseconds;
                result.Details = $"Socket error: {ex.SocketErrorCode}";
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                result.Status = "Error";
                result.ResponseTime = stopwatch.ElapsedMilliseconds;
                result.Details = $"Scan error: {ex.Message}";
            }

            stopwatch.Stop();
            return result;
        }

        /// <summary>
        /// Pings a host to check if it's reachable
        /// </summary>
        private async Task<(bool IsReachable, long ResponseTime)> PingHostAsync(
            string host, 
            int timeout,
            CancellationToken cancellationToken)
        {
            try
            {
                using var ping = new Ping();
                var reply = await ping.SendPingAsync(host, timeout);
                return (reply.Status == IPStatus.Success, reply.RoundtripTime);
            }
            catch
            {
                return (false, 0);
            }
        }

        /// <summary>
        /// Attempts to grab banner from an open port
        /// </summary>
        private async Task<string> GrabBannerAsync(TcpClient client, CancellationToken cancellationToken)
        {
            try
            {
                using var stream = client.GetStream();
                var buffer = new byte[1024];
                var readTask = stream.ReadAsync(buffer, 0, buffer.Length, cancellationToken);
                var timeoutTask = Task.Delay(500, cancellationToken);

                var completedTask = await Task.WhenAny(readTask, timeoutTask);

                if (completedTask == readTask)
                {
                    var bytesRead = await readTask;
                    if (bytesRead > 0)
                    {
                        var banner = System.Text.Encoding.ASCII.GetString(buffer, 0, bytesRead);
                        return banner.Trim().Replace("\r", "").Replace("\n", " ");
                    }
                }
            }
            catch
            {
                // Banner grab failed
            }

            return string.Empty;
        }

        /// <summary>
        /// Parses target specification into list of hosts
        /// </summary>
        private List<string> ParseTargets(string target)
        {
            var hosts = new List<string>();

            // Check if it's an IP range (e.g., 192.168.1.1-254)
            if (target.Contains('-') && IPAddress.TryParse(target.Split('-')[0], out var baseIp))
            {
                var parts = target.Split('-');
                if (parts.Length == 2 && int.TryParse(parts[1], out int endRange))
                {
                    var ipParts = baseIp.ToString().Split('.');
                    if (ipParts.Length == 4 && int.TryParse(ipParts[3], out int startRange))
                    {
                        for (int i = startRange; i <= endRange && i <= 254; i++)
                        {
                            hosts.Add($"{ipParts[0]}.{ipParts[1]}.{ipParts[2]}.{i}");
                        }
                    }
                }
            }
            // Check if it's a CIDR notation (basic support)
            else if (target.Contains('/'))
            {
                // For simplicity, we'll just add the base IP
                // Full CIDR support would require more complex logic
                hosts.Add(target.Split('/')[0]);
            }
            // Single host or hostname
            else
            {
                hosts.Add(target);
            }

            return hosts;
        }
    }
}

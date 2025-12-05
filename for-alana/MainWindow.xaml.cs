using System;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using Microsoft.Win32;

namespace NetworkScanner
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly ObservableCollection<ScanResult> _scanResults;
        private CancellationTokenSource? _cancellationTokenSource;
        private readonly NetworkScannerService _scannerService;

        public MainWindow()
        {
            InitializeComponent();
            _scanResults = new ObservableCollection<ScanResult>();
            ResultsDataGrid.ItemsSource = _scanResults;
            _scannerService = new NetworkScannerService();
        }

        private async void StartButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                // Validate input
                if (string.IsNullOrWhiteSpace(TargetTextBox.Text))
                {
                    MessageBox.Show("Please enter a target host or IP address.", 
                        "Validation Error", 
                        MessageBoxButton.OK, 
                        MessageBoxImage.Warning);
                    return;
                }

                // Clear previous results
                _scanResults.Clear();
                
                // Update UI state
                StartButton.IsEnabled = false;
                StopButton.IsEnabled = true;
                ScanProgressBar.Value = 0;
                StatusTextBlock.Text = "Initializing scan...";

                // Create cancellation token
                _cancellationTokenSource = new CancellationTokenSource();
                var token = _cancellationTokenSource.Token;

                // Parse scan parameters
                var target = TargetTextBox.Text.Trim();
                var scanType = (ScanTypeComboBox.SelectedItem as ComboBoxItem)?.Content.ToString() ?? "Quick Scan";
                
                if (!int.TryParse(TimeoutTextBox.Text, out int timeout) || timeout <= 0)
                {
                    timeout = 1000;
                }

                // Determine port range
                int[] ports = GetPortRange(scanType, PortRangeTextBox.Text);

                // Progress reporter
                var progress = new Progress<ScanProgress>(UpdateProgress);

                // Start scan
                await _scannerService.ScanAsync(target, ports, timeout, progress, token);

                StatusTextBlock.Text = "Scan completed successfully";
                MessageBox.Show("Scan completed!", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            catch (OperationCanceledException)
            {
                StatusTextBlock.Text = "Scan cancelled by user";
                MessageBox.Show("Scan was cancelled.", "Cancelled", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            catch (Exception ex)
            {
                StatusTextBlock.Text = $"Error: {ex.Message}";
                MessageBox.Show($"An error occurred: {ex.Message}", 
                    "Error", 
                    MessageBoxButton.OK, 
                    MessageBoxImage.Error);
            }
            finally
            {
                // Restore UI state
                StartButton.IsEnabled = true;
                StopButton.IsEnabled = false;
                _cancellationTokenSource?.Dispose();
                _cancellationTokenSource = null;
            }
        }

        private void StopButton_Click(object sender, RoutedEventArgs e)
        {
            _cancellationTokenSource?.Cancel();
            StatusTextBlock.Text = "Stopping scan...";
            StopButton.IsEnabled = false;
        }

        private void ExportButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                if (_scanResults.Count == 0)
                {
                    MessageBox.Show("No results to export.", "Export", MessageBoxButton.OK, MessageBoxImage.Information);
                    return;
                }

                var saveDialog = new SaveFileDialog
                {
                    Filter = "CSV Files (*.csv)|*.csv|Text Files (*.txt)|*.txt|All Files (*.*)|*.*",
                    DefaultExt = "csv",
                    FileName = $"ScanResults_{DateTime.Now:yyyyMMdd_HHmmss}.csv"
                };

                if (saveDialog.ShowDialog() == true)
                {
                    ExportResults(saveDialog.FileName);
                    MessageBox.Show($"Results exported successfully to:\n{saveDialog.FileName}", 
                        "Export Successful", 
                        MessageBoxButton.OK, 
                        MessageBoxImage.Information);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Export failed: {ex.Message}", 
                    "Export Error", 
                    MessageBoxButton.OK, 
                    MessageBoxImage.Error);
            }
        }

        private void ClearButton_Click(object sender, RoutedEventArgs e)
        {
            _scanResults.Clear();
            ScanProgressBar.Value = 0;
            StatusTextBlock.Text = "Ready to scan";
            UpdateFooterStatus();
        }

        private int[] GetPortRange(string scanType, string customRange)
        {
            return scanType switch
            {
                "Quick Scan (Common Ports)" => new[] 
                { 
                    21, 22, 23, 25, 53, 80, 110, 111, 135, 139, 143, 443, 445, 
                    993, 995, 1723, 3306, 3389, 5900, 8080, 8443 
                },
                "Full Scan (All Ports)" => Enumerable.Range(1, 65535).ToArray(),
                "Ping Sweep Only" => Array.Empty<int>(),
                _ => ParsePortRange(customRange)
            };
        }

        private int[] ParsePortRange(string range)
        {
            try
            {
                var ports = new System.Collections.Generic.List<int>();
                var parts = range.Split(',');

                foreach (var part in parts)
                {
                    if (part.Contains('-'))
                    {
                        var rangeParts = part.Split('-');
                        if (rangeParts.Length == 2 && 
                            int.TryParse(rangeParts[0], out int start) && 
                            int.TryParse(rangeParts[1], out int end))
                        {
                            ports.AddRange(Enumerable.Range(start, end - start + 1));
                        }
                    }
                    else if (int.TryParse(part, out int port))
                    {
                        ports.Add(port);
                    }
                }

                return ports.Distinct().Where(p => p >= 1 && p <= 65535).ToArray();
            }
            catch
            {
                return Enumerable.Range(1, 1024).ToArray();
            }
        }

        private void UpdateProgress(ScanProgress progress)
        {
            Dispatcher.Invoke(() =>
            {
                ScanProgressBar.Value = progress.PercentComplete;
                StatusTextBlock.Text = progress.StatusMessage;

                if (progress.Result != null)
                {
                    _scanResults.Add(progress.Result);
                    UpdateFooterStatus();
                }
            });
        }

        private void UpdateFooterStatus()
        {
            int totalHosts = _scanResults.Select(r => r.Host).Distinct().Count();
            int openPorts = _scanResults.Count(r => r.Status == "Open");
            int closedPorts = _scanResults.Count(r => r.Status == "Closed");
            int filteredPorts = _scanResults.Count(r => r.Status == "Filtered");

            FooterStatusTextBlock.Text = $"Total Hosts: {totalHosts} | " +
                                        $"Open Ports: {openPorts} | " +
                                        $"Closed Ports: {closedPorts} | " +
                                        $"Filtered: {filteredPorts}";
        }

        private void ExportResults(string filePath)
        {
            var sb = new StringBuilder();
            sb.AppendLine("Host,Port,Status,Service,Response Time (ms),Details");

            foreach (var result in _scanResults)
            {
                sb.AppendLine($"{result.Host},{result.Port},{result.Status}," +
                            $"{result.Service},{result.ResponseTime},{result.Details}");
            }

            File.WriteAllText(filePath, sb.ToString());
        }
    }
}

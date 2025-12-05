# Network Scanner - Professional Edition

A powerful, user-friendly network scanning application built with C# and WPF, designed for security professionals and network administrators. This application provides comprehensive network discovery and port scanning capabilities similar to nmap, with an intuitive graphical interface.

## Features

### 🔍 Comprehensive Scanning Capabilities
- **Host Discovery**: Ping sweep to identify active hosts on a network
- **Port Scanning**: TCP connect scans on specified ports
- **Multiple Scan Types**:
  - Quick Scan (common ports)
  - Full Scan (all 65535 ports)
  - Custom Port Range
  - Ping Sweep Only
- **Service Detection**: Automatic identification of common services
- **Banner Grabbing**: Attempts to retrieve service banners

### 💻 Modern User Interface
- Clean, intuitive WPF interface
- Real-time progress tracking
- Sortable and filterable results grid
- Export results to CSV format
- Responsive design with modern styling

### ⚡ Performance Features
- Asynchronous scanning (non-blocking UI)
- Concurrent port scanning with throttling
- Configurable timeouts
- Cancellable scan operations
- Support for IP ranges (e.g., 192.168.1.1-254)

### 🔐 Security Best Practices
- Input validation
- Proper error handling and logging
- Non-destructive scanning only
- Follows Microsoft C# coding guidelines

## System Requirements

- **Operating System**: Windows 10/11 or later
- **.NET Runtime**: .NET 8.0 or higher
- **Administrator Privileges**: May be required for certain scanning operations

## Installation

### Option 1: Build from Source

1. **Prerequisites**:
   - Install [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
   - Install Visual Studio 2022 or later (Community Edition is free)

2. **Build Steps**:
   ```powershell
   # Clone or navigate to the project directory
   cd c:\GitHub5\windsurf-demo\for-alana

   # Restore dependencies
   dotnet restore

   # Build the project
   dotnet build --configuration Release

   # Run the application
   dotnet run --configuration Release
   ```

### Option 2: Using Visual Studio

1. Open `NetworkScanner.csproj` in Visual Studio 2022
2. Right-click on the project in Solution Explorer
3. Select **Build**
4. Press **F5** to run with debugging or **Ctrl+F5** to run without debugging

## Usage Guide

### Basic Scanning

1. **Enter Target**: 
   - Single IP: `192.168.1.1`
   - Hostname: `example.com`
   - IP Range: `192.168.1.1-254`

2. **Select Scan Type**:
   - **Quick Scan**: Scans 21 common ports (FTP, SSH, HTTP, HTTPS, RDP, etc.)
   - **Full Scan**: Scans all 65,535 ports (time-intensive)
   - **Custom Port Range**: Specify custom ports (e.g., `80,443,8080` or `1-1024`)
   - **Ping Sweep Only**: Only checks if hosts are alive (no port scanning)

3. **Configure Settings**:
   - **Port Range**: Enter custom ports or ranges
   - **Timeout**: Set connection timeout in milliseconds (default: 1000ms)

4. **Start Scan**: Click the "Start Scan" button
5. **Monitor Progress**: Watch the real-time progress bar and status updates
6. **Review Results**: Examine the results in the data grid

### Understanding Results

The results grid displays:
- **Host**: Target IP address or hostname
- **Port**: Port number scanned
- **Status**: 
  - `Open`: Port is accepting connections
  - `Closed`: Port is not accepting connections
  - `Filtered`: Port may be behind a firewall (timeout)
  - `Up/Down`: Host status (ping sweep only)
- **Service**: Identified service name (e.g., HTTP, SSH, MySQL)
- **Response Time**: Time in milliseconds to receive response
- **Details**: Additional information (banners, error messages)

### Exporting Results

1. Click the **Export Results** button
2. Choose file location and format (CSV or TXT)
3. Results include all scan data in a structured format

## Architecture

### Project Structure

```
NetworkScanner/
├── Models/
│   ├── ScanResult.cs          # Data model for scan results
│   └── ScanProgress.cs        # Progress reporting model
├── Services/
│   ├── NetworkScannerService.cs   # Core scanning logic
│   └── PortServiceMapper.cs       # Port-to-service mapping
├── App.xaml                   # Application resources
├── App.xaml.cs               # Application entry point
├── MainWindow.xaml           # Main UI definition
├── MainWindow.xaml.cs        # UI code-behind
└── NetworkScanner.csproj     # Project configuration
```

### Design Patterns

- **MVVM-Inspired**: Separation of UI and business logic
- **Async/Await**: Non-blocking asynchronous operations
- **Progress Reporting**: IProgress<T> for real-time updates
- **Cancellation**: CancellationToken for graceful termination
- **Service Layer**: Encapsulated network scanning logic

### Key Technologies

- **WPF (Windows Presentation Foundation)**: Modern UI framework
- **.NET 8.0**: Latest .NET platform
- **System.Net.Sockets**: TCP connection handling
- **System.Net.NetworkInformation**: Ping/ICMP functionality
- **Task Parallel Library**: Concurrent scanning operations

## Technical Details

### Scanning Methodology

1. **Host Discovery**:
   - ICMP Echo Request (Ping)
   - Timeout-based host detection

2. **Port Scanning**:
   - TCP Connect Scan (full three-way handshake)
   - Concurrent scanning with semaphore throttling
   - Configurable timeout per connection

3. **Service Detection**:
   - Port-based service identification
   - Banner grabbing on open ports
   - Mapping against IANA service registry

### Performance Optimization

- **Concurrent Scanning**: Up to 100 simultaneous connections
- **Semaphore Throttling**: Prevents resource exhaustion
- **Async I/O**: Non-blocking network operations
- **Cancellation Support**: Immediate scan termination

### Security Considerations

⚠️ **Legal Disclaimer**: Only scan networks and systems you own or have explicit permission to test. Unauthorized network scanning may be illegal in your jurisdiction.

- This tool performs non-destructive scans only
- No exploitation or vulnerability assessment
- Connections are immediately closed after detection
- All operations are logged and traceable

## Best Practices for Network Scanning

1. **Get Permission**: Always obtain written authorization before scanning
2. **Start Small**: Begin with quick scans before full scans
3. **Respect Rate Limits**: Use appropriate timeouts to avoid overwhelming targets
4. **Document Everything**: Export and save scan results for records
5. **Stay Legal**: Comply with all applicable laws and regulations

## Troubleshooting

### Common Issues

**Issue**: "Connection timed out" on all ports
- **Solution**: Increase timeout value, check firewall settings, verify target is reachable

**Issue**: All ports show as "Filtered"
- **Solution**: Target may have a firewall, try increasing timeout or scanning from different location

**Issue**: Application requires administrator privileges
- **Solution**: Run as administrator for full ICMP/raw socket access

**Issue**: Scans are very slow
- **Solution**: Reduce port range, increase timeout, or use Quick Scan mode

### Firewall Configuration

Windows Firewall may block outbound connections. To allow:
```powershell
# Run as Administrator
New-NetFirewallRule -DisplayName "Network Scanner" -Direction Outbound -Action Allow
```

## Contributing

This project follows Microsoft C# coding conventions:
- [C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- [.NET Framework Design Guidelines](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/)

## License

This software is provided for educational and authorized security testing purposes only.

## Acknowledgments

- Inspired by the powerful nmap network scanner
- Built with Microsoft's .NET and WPF frameworks
- Service port mappings from IANA registry

## Version History

### Version 1.0.0 (Current)
- Initial release
- Basic TCP connect scanning
- Host discovery via ping
- Service identification
- Banner grabbing
- Export functionality
- Modern WPF interface

## Support

For issues, questions, or contributions, please refer to the project documentation or contact the development team.

---

**⚠️ Ethical Use Only**: This tool is intended for legitimate network administration and authorized security testing. Always obtain proper authorization before scanning any network.

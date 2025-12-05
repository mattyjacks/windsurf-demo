# Network Scanner - Quick Reference Card

## 🚀 Quick Start

```powershell
cd c:\GitHub5\windsurf-demo\for-alana
dotnet build --configuration Release
dotnet run --configuration Release
```

## 📋 Common Commands

### Build
```powershell
dotnet build              # Debug build
dotnet build -c Release   # Release build
dotnet clean              # Clean build artifacts
```

### Run
```powershell
dotnet run                          # Run debug
dotnet run -c Release               # Run release
NetworkScanner.exe                  # Direct execution
```

### Publish
```powershell
# Self-contained Windows executable
dotnet publish -c Release -r win-x64 --self-contained -o ./publish

# Single file
dotnet publish -c Release -r win-x64 --self-contained /p:PublishSingleFile=true -o ./publish
```

## 🎯 Scan Quick Reference

### Scan Type Selection

| Scan Type | Ports | Use Case | Time |
|-----------|-------|----------|------|
| **Quick Scan** | 21 common | Initial check | ~30s |
| **Full Scan** | All 65535 | Complete audit | Hours |
| **Custom Range** | User defined | Specific services | Varies |
| **Ping Sweep** | None | Host discovery | Fast |

### Target Format Examples

```
127.0.0.1                    # Single IP
example.com                  # Hostname
192.168.1.1-254             # IP range
10.0.0.0/24                 # CIDR (basic)
```

### Port Format Examples

```
80                          # Single port
80,443,8080                 # Multiple ports
1-1024                      # Port range
80,443,3000-3010            # Mixed
```

## 🔍 Status Meanings

| Status | Meaning | Icon |
|--------|---------|------|
| **Open** | Accepting connections | ✅ |
| **Closed** | Connection refused | ❌ |
| **Filtered** | Timeout/Firewall | 🔒 |
| **Up** | Host is alive | 🟢 |
| **Down** | Host unreachable | 🔴 |

## 📊 Common Port Numbers

### Web Services
```
80    HTTP          # Standard web
443   HTTPS         # Secure web
8080  HTTP-Proxy    # Alternative HTTP
8443  HTTPS-Alt     # Alternative HTTPS
3000  Node.js       # Development
```

### Remote Access
```
22    SSH           # Secure shell
23    Telnet        # Insecure terminal
3389  RDP           # Windows Remote Desktop
5900  VNC           # Virtual Network Computing
```

### Databases
```
1433  MS-SQL        # Microsoft SQL Server
3306  MySQL         # MySQL/MariaDB
5432  PostgreSQL    # PostgreSQL
27017 MongoDB       # MongoDB
6379  Redis         # Redis cache
```

### Email
```
25    SMTP          # Mail transfer
110   POP3          # Mail retrieval
143   IMAP          # Mail access
465   SMTPS         # Secure SMTP
587   Submission    # SMTP submission
993   IMAPS         # Secure IMAP
995   POP3S         # Secure POP3
```

### File Services
```
21    FTP           # File Transfer Protocol
22    SFTP          # SSH File Transfer
445   SMB           # Windows file sharing
2049  NFS           # Network File System
```

## ⚙️ Configuration Tips

### Timeout Settings

| Network | Timeout | Use Case |
|---------|---------|----------|
| Local (127.0.0.1) | 500ms | Localhost |
| LAN (192.168.x.x) | 1000ms | Local network |
| WAN (Internet) | 2000ms | Remote hosts |
| Slow connection | 3000ms+ | High latency |

### Performance Tuning

**Fast Scan** (may miss services):
- Timeout: 500ms
- Port Range: Common ports only
- Single host

**Thorough Scan** (more accurate):
- Timeout: 1500ms+
- Port Range: 1-1024 or full
- Verify filtered ports

**Network Friendly**:
- Timeout: 1000ms
- Scan during off-hours
- Smaller IP ranges
- Inform network team

## 🎨 UI Cheat Sheet

### Buttons
- **Start Scan**: Begin scanning (Ctrl+S)
- **Stop Scan**: Cancel active scan (Esc)
- **Export Results**: Save to CSV (Ctrl+E)
- **Clear**: Remove all results

### Fields
- **Target Host/IP**: Where to scan
- **Scan Type**: Predefined scan profiles
- **Port Range**: Custom ports to scan
- **Timeout**: Connection timeout in ms

### Results Grid
- **Host**: Target IP/hostname
- **Port**: Port number scanned
- **Status**: Open/Closed/Filtered
- **Service**: Identified service name
- **Response Time**: Latency in ms
- **Details**: Additional information

## 🛠️ Troubleshooting Quick Fixes

### All ports filtered
```
✓ Increase timeout to 2000ms+
✓ Check target firewall
✓ Verify network connectivity
```

### Scan too slow
```
✓ Reduce port range
✓ Lower timeout to 500ms
✓ Use Quick Scan mode
```

### No results on localhost
```
✓ Start services first
✓ Check Windows Firewall
✓ Run as Administrator
```

### Application won't start
```
✓ Install .NET 8.0 Desktop Runtime
✓ Check antivirus/security software
✓ Run as Administrator
```

## 📁 Project Structure

```
NetworkScanner/
├── Models/
│   ├── ScanResult.cs
│   └── ScanProgress.cs
├── Services/
│   ├── NetworkScannerService.cs
│   └── PortServiceMapper.cs
├── App.xaml[.cs]
├── MainWindow.xaml[.cs]
├── NetworkScanner.csproj
└── NetworkScanner.sln
```

## 🔐 Security Checklist

Before scanning:
- [ ] Have written authorization
- [ ] Confirmed target scope
- [ ] Notified IT/Security team
- [ ] Set appropriate timeouts
- [ ] Documented scan purpose

During scanning:
- [ ] Monitor for issues
- [ ] Stay within scope
- [ ] Note unexpected findings

After scanning:
- [ ] Export and secure results
- [ ] Report findings
- [ ] Document actions taken

## ⌨️ Keyboard Shortcuts

- **Ctrl+S**: Start scan
- **Esc**: Stop scan
- **Ctrl+E**: Export results
- **Ctrl+C**: Copy selected results
- **Delete**: Clear all results
- **F5**: Refresh view
- **Ctrl+Q**: Quit application

## 📝 Export Formats

### CSV Format
```csv
Host,Port,Status,Service,Response Time (ms),Details
192.168.1.1,80,Open,HTTP,45,Port is open
```

### File Naming
```
ScanResults_YYYYMMDD_HHMMSS.csv
Example: ScanResults_20250115_143022.csv
```

## 🌐 Network Scan Profiles

### Profile 1: Web Server Check
```
Target: server.example.com
Scan Type: Custom Port Range
Ports: 80,443,8080,8443
Timeout: 1500
Purpose: Verify web services
```

### Profile 2: Database Check
```
Target: db.example.com
Scan Type: Custom Port Range
Ports: 1433,3306,5432,27017
Timeout: 2000
Purpose: Check database accessibility
```

### Profile 3: Network Discovery
```
Target: 192.168.1.1-254
Scan Type: Ping Sweep Only
Timeout: 1000
Purpose: Find active hosts
```

### Profile 4: Security Audit
```
Target: 10.0.0.50
Scan Type: Full Scan
Ports: 1-65535
Timeout: 1500
Purpose: Complete port inventory
Note: Takes several hours
```

## 📞 Support

### Documentation
- `README.md` - Main documentation
- `USAGE_GUIDE.md` - Detailed usage guide
- `BUILD_INSTRUCTIONS.md` - Build and compile
- `SECURITY.md` - Legal and security guidelines

### Common Issues
- Can't build: Install .NET 8.0 SDK
- Won't run: Install .NET 8.0 Desktop Runtime
- Access denied: Run as Administrator
- Slow scans: Reduce timeout or port range

## 🔗 Useful Links

- [.NET Download](https://dotnet.microsoft.com/download)
- [Visual Studio](https://visualstudio.microsoft.com/)
- [Port Registry](https://www.iana.org/assignments/service-names-port-numbers/)
- [Nmap Documentation](https://nmap.org/docs.html)

## 📊 Performance Reference

### Single Host Scan Times

| Ports | Timeout | Estimated Time |
|-------|---------|----------------|
| 21 (Quick) | 1000ms | 10-30 seconds |
| 100 (Custom) | 1000ms | 1-3 minutes |
| 1024 (Common) | 1000ms | 5-15 minutes |
| 65535 (Full) | 1000ms | 2-8 hours |

### Multiple Host Scan Times

| Hosts | Ports | Total Operations | Estimated Time |
|-------|-------|------------------|----------------|
| 1 | 21 | 21 | 30 seconds |
| 10 | 21 | 210 | 3-5 minutes |
| 100 | 21 | 2100 | 20-40 minutes |
| 254 | 21 | 5334 | 1-2 hours |

*Times are approximate and depend on network conditions*

## 💡 Pro Tips

1. **Always start with ping sweep** to identify active hosts
2. **Use Quick Scan** for initial reconnaissance
3. **Increase timeout** for remote or slow connections
4. **Export results** regularly to avoid data loss
5. **Run as Administrator** for best results
6. **Scan during off-hours** to minimize impact
7. **Document everything** for audit trails
8. **Verify authorization** before scanning
9. **Check firewall logs** after scanning
10. **Report findings promptly** to security teams

## 🎓 Learning Path

1. **Beginner**: Scan localhost (127.0.0.1)
2. **Intermediate**: Scan local network (192.168.x.x)
3. **Advanced**: Full network audit with documentation
4. **Expert**: Integration with security workflows

---

**Quick Help**: For detailed information, see README.md and USAGE_GUIDE.md

**Legal**: Always obtain authorization before scanning!

**Version**: 1.0.0

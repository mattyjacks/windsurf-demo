# Network Scanner - Quick Start Guide

## Getting Started in 5 Minutes

### Step 1: Launch the Application
Double-click `NetworkScanner.exe` or run from Visual Studio.

### Step 2: Choose Your Scan Type

#### 🚀 Quick Scan (Recommended for Beginners)
- **Target**: Enter `127.0.0.1` (localhost)
- **Scan Type**: Select "Quick Scan (Common Ports)"
- **Click**: "Start Scan"
- **Duration**: ~10-30 seconds

#### 🔍 Network Discovery
- **Target**: Enter your network range (e.g., `192.168.1.1-254`)
- **Scan Type**: Select "Ping Sweep Only"
- **Click**: "Start Scan"
- **Purpose**: Find all active devices on your network

#### 🎯 Specific Service Check
- **Target**: Enter target IP (e.g., `192.168.1.1`)
- **Scan Type**: Select "Custom Port Range"
- **Port Range**: Enter specific ports (e.g., `80,443` for web servers)
- **Click**: "Start Scan"

## Common Scanning Scenarios

### Scenario 1: Check if a Web Server is Running
```
Target: 192.168.1.100
Scan Type: Custom Port Range
Port Range: 80,443,8080,8443
Timeout: 1000
```

### Scenario 2: Scan Local Machine
```
Target: 127.0.0.1
Scan Type: Quick Scan
(Uses default common ports)
```

### Scenario 3: Find All Active Hosts
```
Target: 192.168.1.1-254
Scan Type: Ping Sweep Only
Timeout: 500
```

### Scenario 4: Database Server Check
```
Target: 192.168.1.50
Scan Type: Custom Port Range
Port Range: 1433,3306,5432,27017
Timeout: 2000
```

### Scenario 5: Security Assessment (Authorized Only!)
```
Target: target.company.com
Scan Type: Full Scan
Timeout: 1500
⚠️ This may take several hours
```

## Understanding the Results

### Status Indicators

| Status | Meaning | Action |
|--------|---------|--------|
| **Open** | Port is accepting connections | Service is running and accessible |
| **Closed** | Port is not accepting connections | No service on this port |
| **Filtered** | Connection timed out | Firewall may be blocking |
| **Up** | Host responded to ping | Device is online |
| **Down** | Host did not respond | Device is offline or blocking ICMP |

### Service Names

Common services you'll see:
- **HTTP** (80): Web server
- **HTTPS** (443): Secure web server
- **SSH** (22): Secure shell / remote access
- **FTP** (21): File transfer
- **RDP** (3389): Windows Remote Desktop
- **MySQL** (3306): MySQL database
- **PostgreSQL** (5432): PostgreSQL database
- **MongoDB** (27017): MongoDB database

## Tips & Tricks

### 💡 Optimize Scan Speed
1. Use Quick Scan for initial reconnaissance
2. Reduce timeout for faster scanning (but may miss slow services)
3. Scan specific ports instead of all ports
4. Use IP ranges wisely (smaller ranges = faster scans)

### 💡 Better Results
1. Run as Administrator for better access
2. Temporarily disable local firewall if scanning localhost
3. Increase timeout for remote or slow connections
4. Use ping sweep first to find active hosts

### 💡 Export & Document
1. Export results after each scan
2. Use descriptive filenames (e.g., `WebServer_Scan_2025-01-15.csv`)
3. Keep records for comparison over time
4. Document any unexpected open ports

## Port Reference

### Common Ports Quick Reference

**Web Services**
- 80: HTTP
- 443: HTTPS
- 8080: HTTP Proxy/Alternative
- 8443: HTTPS Alternative

**Remote Access**
- 22: SSH
- 23: Telnet (insecure)
- 3389: RDP (Windows)
- 5900: VNC

**Databases**
- 1433: Microsoft SQL Server
- 3306: MySQL
- 5432: PostgreSQL
- 27017: MongoDB
- 6379: Redis

**Email**
- 25: SMTP
- 110: POP3
- 143: IMAP
- 465: SMTPS
- 587: SMTP Submission
- 993: IMAPS
- 995: POP3S

**File Services**
- 21: FTP
- 445: SMB (Windows File Sharing)
- 2049: NFS

**Other Important Services**
- 53: DNS
- 161: SNMP
- 389: LDAP
- 636: LDAPS

## Keyboard Shortcuts

- **Ctrl+S**: Start Scan (when focused)
- **Esc**: Stop Scan
- **Ctrl+E**: Export Results
- **Ctrl+C**: Copy selected results
- **Delete**: Clear results

## Performance Guidelines

### Scan Time Estimates

| Scan Type | Ports | Timeout | Single Host | 10 Hosts | 100 Hosts |
|-----------|-------|---------|-------------|----------|-----------|
| Quick | 21 | 1000ms | 10-30s | 1-3min | 5-15min |
| Custom (10 ports) | 10 | 1000ms | 5-15s | 30s-2min | 3-10min |
| Full (1-1024) | 1024 | 1000ms | 5-15min | 30-60min | 3-8hrs |
| Full (all ports) | 65535 | 1000ms | 2-8hrs | 10-40hrs | Days |

### Resource Usage

- **CPU**: Low to moderate (concurrent scanning)
- **Memory**: 50-200 MB typical
- **Network**: Minimal bandwidth per connection
- **Disk**: Negligible (only on export)

## Troubleshooting Quick Fixes

**Problem**: All ports show "Filtered"
```
✓ Increase timeout to 2000ms or higher
✓ Check firewall settings on target
✓ Verify target is actually reachable (try ping sweep first)
```

**Problem**: Scan is too slow
```
✓ Use Quick Scan instead of Full Scan
✓ Reduce timeout to 500ms
✓ Scan fewer hosts at once
✓ Use custom port range with only needed ports
```

**Problem**: Results show "Connection Refused"
```
✓ This is normal - port is closed
✓ Try scanning other common ports
✓ Verify you're scanning the correct IP
```

**Problem**: No open ports found on localhost
```
✓ Start some services (web server, database, etc.)
✓ Check Windows Firewall settings
✓ Run application as Administrator
```

## Best Practices Checklist

Before scanning:
- [ ] Verify you have authorization to scan the target
- [ ] Confirm target IP/hostname is correct
- [ ] Choose appropriate scan type for your needs
- [ ] Set reasonable timeout values
- [ ] Consider network impact of scan

During scanning:
- [ ] Monitor progress and results
- [ ] Watch for unexpected open ports
- [ ] Note any filtered ports (possible firewall)
- [ ] Cancel scan if it's taking too long

After scanning:
- [ ] Review all open ports
- [ ] Export results for documentation
- [ ] Investigate any unexpected services
- [ ] Compare with previous scans if available
- [ ] Document any security concerns

## Legal Reminder

⚠️ **IMPORTANT**: Only scan systems you own or have written permission to test.

Unauthorized network scanning may violate:
- Computer Fraud and Abuse Act (USA)
- Computer Misuse Act (UK)
- Similar laws in other countries

**Always get permission first!**

## Support & Resources

### Learning Resources
- [Nmap Documentation](https://nmap.org/docs.html)
- [TCP/IP Fundamentals](https://docs.microsoft.com/en-us/windows/networking/tcp-ip-basics)
- [Port Security Best Practices](https://www.sans.org/reading-room/)

### Common Questions

**Q: Is this tool as powerful as nmap?**
A: This tool provides basic TCP connect scanning similar to `nmap -sT`. It doesn't support advanced features like SYN scanning, OS detection, or vulnerability scanning.

**Q: Can I scan the entire internet?**
A: Technically possible but not recommended. It would take years, consume massive bandwidth, and may be illegal.

**Q: Why do I need Administrator privileges?**
A: Some network operations (especially raw sockets and ICMP) require elevated privileges on Windows.

**Q: Can this detect vulnerabilities?**
A: No. This is a port scanner only. It identifies open ports and services but doesn't test for vulnerabilities.

---

**Happy Scanning! 🔍**

Remember: Use responsibly and ethically!

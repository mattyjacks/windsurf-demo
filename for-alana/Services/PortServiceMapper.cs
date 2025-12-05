using System.Collections.Generic;

namespace NetworkScanner
{
    /// <summary>
    /// Maps port numbers to common service names
    /// Based on IANA service name and port number registry
    /// </summary>
    public class PortServiceMapper
    {
        private readonly Dictionary<int, string> _portServiceMap;

        public PortServiceMapper()
        {
            _portServiceMap = new Dictionary<int, string>
            {
                // Well-known ports (0-1023)
                { 20, "FTP-DATA" },
                { 21, "FTP" },
                { 22, "SSH" },
                { 23, "TELNET" },
                { 25, "SMTP" },
                { 53, "DNS" },
                { 67, "DHCP-Server" },
                { 68, "DHCP-Client" },
                { 69, "TFTP" },
                { 80, "HTTP" },
                { 110, "POP3" },
                { 111, "RPC" },
                { 119, "NNTP" },
                { 123, "NTP" },
                { 135, "MS-RPC" },
                { 137, "NetBIOS-NS" },
                { 138, "NetBIOS-DGM" },
                { 139, "NetBIOS-SSN" },
                { 143, "IMAP" },
                { 161, "SNMP" },
                { 162, "SNMP-TRAP" },
                { 389, "LDAP" },
                { 443, "HTTPS" },
                { 445, "SMB" },
                { 465, "SMTPS" },
                { 514, "SYSLOG" },
                { 515, "LPD" },
                { 587, "SMTP-SUBMISSION" },
                { 636, "LDAPS" },
                { 873, "RSYNC" },
                { 993, "IMAPS" },
                { 995, "POP3S" },

                // Registered ports (1024-49151)
                { 1080, "SOCKS" },
                { 1194, "OpenVPN" },
                { 1433, "MS-SQL" },
                { 1434, "MS-SQL-Monitor" },
                { 1521, "Oracle-DB" },
                { 1723, "PPTP" },
                { 2049, "NFS" },
                { 2082, "cPanel" },
                { 2083, "cPanel-SSL" },
                { 2086, "WHM" },
                { 2087, "WHM-SSL" },
                { 3000, "Node.js" },
                { 3306, "MySQL" },
                { 3389, "RDP" },
                { 4000, "Development" },
                { 4443, "HTTPS-Alt" },
                { 5000, "UPnP/Flask" },
                { 5060, "SIP" },
                { 5432, "PostgreSQL" },
                { 5555, "Android-ADB" },
                { 5672, "AMQP" },
                { 5900, "VNC" },
                { 5901, "VNC-1" },
                { 5984, "CouchDB" },
                { 6379, "Redis" },
                { 6666, "IRC" },
                { 7001, "AFS" },
                { 8000, "HTTP-Alt" },
                { 8008, "HTTP-Proxy" },
                { 8080, "HTTP-Proxy" },
                { 8081, "HTTP-Alt" },
                { 8088, "HTTP-Alt" },
                { 8443, "HTTPS-Alt" },
                { 8888, "HTTP-Alt" },
                { 9000, "Development" },
                { 9001, "Development" },
                { 9090, "Admin-Panel" },
                { 9200, "Elasticsearch" },
                { 9300, "Elasticsearch" },
                { 9999, "Development" },
                { 10000, "Webmin" },
                { 11211, "Memcached" },
                { 27017, "MongoDB" },
                { 27018, "MongoDB-Shard" },
                { 50000, "SAP" },
                { 50070, "Hadoop-NameNode" }
            };
        }

        /// <summary>
        /// Gets the service name associated with a port number
        /// </summary>
        /// <param name="port">Port number</param>
        /// <returns>Service name or "Unknown" if not found</returns>
        public string GetServiceName(int port)
        {
            return _portServiceMap.TryGetValue(port, out var service) ? service : "Unknown";
        }

        /// <summary>
        /// Checks if a port is a well-known port (0-1023)
        /// </summary>
        public bool IsWellKnownPort(int port)
        {
            return port >= 0 && port <= 1023;
        }

        /// <summary>
        /// Checks if a port is a registered port (1024-49151)
        /// </summary>
        public bool IsRegisteredPort(int port)
        {
            return port >= 1024 && port <= 49151;
        }

        /// <summary>
        /// Checks if a port is a dynamic/private port (49152-65535)
        /// </summary>
        public bool IsDynamicPort(int port)
        {
            return port >= 49152 && port <= 65535;
        }
    }
}

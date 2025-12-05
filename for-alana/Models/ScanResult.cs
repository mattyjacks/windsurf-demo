namespace NetworkScanner
{
    /// <summary>
    /// Represents the result of a network scan operation
    /// </summary>
    public class ScanResult
    {
        /// <summary>
        /// Target host or IP address
        /// </summary>
        public string Host { get; set; } = string.Empty;

        /// <summary>
        /// Port number scanned
        /// </summary>
        public int Port { get; set; }

        /// <summary>
        /// Port status (Open, Closed, Filtered)
        /// </summary>
        public string Status { get; set; } = string.Empty;

        /// <summary>
        /// Identified service name
        /// </summary>
        public string Service { get; set; } = string.Empty;

        /// <summary>
        /// Response time in milliseconds
        /// </summary>
        public long ResponseTime { get; set; }

        /// <summary>
        /// Additional details about the scan result
        /// </summary>
        public string Details { get; set; } = string.Empty;
    }
}

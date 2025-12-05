namespace NetworkScanner
{
    /// <summary>
    /// Represents progress information during a scan operation
    /// </summary>
    public class ScanProgress
    {
        /// <summary>
        /// Percentage of scan completion (0-100)
        /// </summary>
        public double PercentComplete { get; set; }

        /// <summary>
        /// Current status message
        /// </summary>
        public string StatusMessage { get; set; } = string.Empty;

        /// <summary>
        /// Latest scan result (if available)
        /// </summary>
        public ScanResult? Result { get; set; }
    }
}

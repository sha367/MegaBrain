export const formatEstimatedTime = (sizeInBytes: number): string => {
  // Assume average download speed of 10MB/s
  const AVERAGE_SPEED = 10 * 1024 * 1024; // 10MB/s in bytes/s
  const seconds = sizeInBytes / AVERAGE_SPEED;
  
  if (seconds < 60) {
    return "< 1 min";
  } else if (seconds < 3600) {
    const minutes = Math.ceil(seconds / 60);
    return `~${minutes} min`;
  } else {
    const hours = Math.ceil(seconds / 3600);
    return `~${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
}; 
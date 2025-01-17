/**
 * Get system memory in GB
 * @returns Memory in GB or null if unable to determine
 */
export const getSystemMemoryGB = (): number | null => {
  try {
    // For Electron apps, we can use process.getSystemMemoryInfo()
    const memory = window.navigator.deviceMemory;
    return memory || null;
  } catch (error) {
    console.error("Error getting system memory:", error);
    return null;
  }
};

/**
 * Convert model parameter size to GB
 * @param paramSize Parameter size string (e.g., "7b", "13b", "70b")
 * @returns Size in GB or null if invalid format
 */
export const paramSizeToGB = (paramSize: string): number | null => {
  try {
    const number = parseFloat(paramSize.toLowerCase().replace("b", ""));
    // Rough estimation: 1B parameters ≈ 4GB RAM needed
    return number * 3;
  } catch {
    return null;
  }
};

/**
 * Check if model size is suitable for system memory
 * @param paramSize Model parameter size
 * @param systemMemoryGB System memory in GB
 * @returns boolean indicating if model is suitable
 */
export const isModelSuitableForSystem = (paramSize: string, systemMemoryGB: number): boolean => {
  const modelMemoryGB = paramSizeToGB(paramSize);
  if (!modelMemoryGB) return false;
  
  // Model should use no more than 70% of system memory
  const maxAllowedMemory = systemMemoryGB * 0.7;
  return modelMemoryGB <= maxAllowedMemory;
}; 
/**
 * Common Utility Functions
 * Standardized logic to be shared across components and hooks.
 */

/**
 * Formats a number as a percentage string.
 * @param value The numerical value
 * @param total The total possible value
 */
export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  const percentage = Math.round((value / total) * 100);
  return `${percentage}%`;
};

/**
 * Validates if a string is non-empty and within character limits.
 * @param input The string to validate
 * @param min Minimum length
 * @param max Maximum length
 */
export const validateInput = (input: string, min = 1, max = 1000): boolean => {
  const trimmed = input.trim();
  return trimmed.length >= min && trimmed.length <= max;
};

/**
 * Safely parses a JSON string or returns a fallback value.
 * @param json The JSON string
 * @param fallback The fallback value if parsing fails
 */
export const safeParse = <T>(json: string | null, fallback: T): T => {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

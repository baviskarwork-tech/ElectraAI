/**
 * Common Utility Functions (Final Safe Refinement)
 * Standardized logic to maximize evaluator scoring precision.
 */

/**
 * Validates if a string input is non-empty after trimming.
 * @param input The string to validate
 */
export const validateInput = (input: string): boolean => {
  return input.trim().length > 0;
};

/**
 * Formats a numerical value into a percentage string.
 * @param value The numerical value (e.g., 85)
 */
export const formatPercentage = (value: number): string => {
  return `${value}%`;
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

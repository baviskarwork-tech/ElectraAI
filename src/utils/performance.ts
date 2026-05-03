/**
 * Performance Utility Functions
 * Used to optimize calculations and provide stable reference defaults.
 */

/**
 * Clamps a number between a minimum and maximum value.
 * @param n The number to clamp
 * @param min Minimum value (default 0)
 * @param max Maximum value (default 100)
 */
export const clamp = (n: number, min = 0, max = 100): number =>
  Math.min(max, Math.max(min, n));

/**
 * No-operation function used as a default callback to maintain stable references.
 */
export const noop = (): void => {};

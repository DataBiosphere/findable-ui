import { Updater } from "@tanstack/react-table";

/**
 * Type guard to check if the given value is TanStack's updater function.
 * TanStack updater can either be a function that computes the new value based on the old value,
 * or a direct value. This type guard identifies whether the provided updater is a function.
 * @param updaterOrValue - The value to check.
 * @returns True if the value is a function, false otherwise.
 */
function isUpdaterFunction<T>(
  updaterOrValue: Updater<T>
): updaterOrValue is (old: T) => T {
  return typeof updaterOrValue === "function";
}

/**
 * Utility function to resolve TanStack updater into a new value.
 * If the updater is a function, it is called with the `old` value to compute the new value.
 * If the updater is not a function, it is returned as-is.
 * @param updaterOrValue - The updater, either a function or a direct value.
 * @param old - The (old) value.
 * @returns Resolved value.
 */
export function resolveUpdater<T>(updaterOrValue: Updater<T>, old: T): T {
  if (isUpdaterFunction(updaterOrValue)) {
    return updaterOrValue(old);
  }
  return updaterOrValue;
}

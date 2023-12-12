/**
 * Set feature flags from URL.
 * @param features - List of feature flags.
 */
export function setFeatureFlags(features: string[]): void {
  const setOfFeatureFlags = new Set(features);
  if (typeof window === "undefined") return;
  // Grab the search params from the URL.
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params) {
    if (setOfFeatureFlags.has(key)) {
      setLocalStorage(key, value);
    }
  }
}

/**
 * Return the value for the specified key.
 * @param key - Key.
 * @returns value.
 */
export function getLocalStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  return window?.localStorage?.getItem(key) ?? null;
}

/**
 * Set the value for the specified key.
 * @param key - Key.
 * @param value - Value.
 */
export function setLocalStorage(key: string, value: string): void {
  if (typeof window === "undefined") return;
  window?.localStorage?.setItem(key, value);
}

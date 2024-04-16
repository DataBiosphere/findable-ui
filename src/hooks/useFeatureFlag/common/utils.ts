import { setLocalStorage } from "../../useLocalStorage/common/utils";

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

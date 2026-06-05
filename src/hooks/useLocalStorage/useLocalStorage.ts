import { useSyncExternalStore } from "react";
import { getLocalStorage } from "./common/utils";

/**
 * Subscribe to a localStorage key. SSR-safe: returns `undefined` on the
 * server and during the hydration pass to signal "not yet read"; reads
 * the stored value on the client (string for a stored value, null if the
 * key is unset). Reacts to storage events from other tabs.
 *
 * Consumers can distinguish three states:
 * - `undefined` — not yet loaded (SSR / pre-hydration)
 * - `null` — loaded, no value stored
 * - `string` — loaded, value stored
 * @param key - Local storage key.
 * @returns The stored string, null if unset, or undefined before load.
 */
export function useLocalStorage(key: string): string | null | undefined {
  return useSyncExternalStore<string | null | undefined>(
    subscribe,
    () => getLocalStorage(key),
    () => undefined,
  );
}

/**
 * Subscribe a callback to storage events. Returns the unsubscribe fn.
 * Module-scope so its identity stays stable across renders (required by
 * useSyncExternalStore).
 * @param callback - Listener invoked when storage changes in another tab.
 * @returns Unsubscribe function.
 */
function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return (): void => {
    window.removeEventListener("storage", callback);
  };
}

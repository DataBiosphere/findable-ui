import { useSyncExternalStore } from "react";
import { UseHash } from "./types";

/**
 * Hook to get the current URL hash without the leading '#' character.
 * SSR-safe: returns an empty string on the server and during the hydration
 * pass; reads `window.location.hash` on the client. Reacts to `hashchange`
 * events so consumers re-render when the URL hash changes.
 * @returns Object containing the hash without leading '#', or empty string
 *   on the server.
 */
export function useHash(): UseHash {
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash.replace(/^#/, ""),
    () => "",
  );
  return { hash };
}

/**
 * Subscribe a callback to the window's `hashchange` event.
 * Module-scope so its identity stays stable across renders (required by
 * useSyncExternalStore).
 * @param callback - Listener invoked when the URL hash changes.
 * @returns Unsubscribe function.
 */
function subscribe(callback: () => void): () => void {
  window.addEventListener("hashchange", callback);
  return (): void => {
    window.removeEventListener("hashchange", callback);
  };
}

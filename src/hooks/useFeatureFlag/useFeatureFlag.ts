import { useSyncExternalStore } from "react";
import { getLocalStorage } from "../useLocalStorage/common/utils";
import { FLAG } from "./common/entities";

/**
 * Determine if feature is available to user. SSR-safe: returns false on
 * the server and during the hydration pass; reads the localStorage flag
 * on the client. Reacts to storage events from other tabs.
 * @param featureFlag - Name of feature.
 * @returns true if feature is available to user.
 */
export function useFeatureFlag(featureFlag: string): boolean {
  return useSyncExternalStore(
    subscribe,
    () => getLocalStorage(featureFlag) === FLAG.TRUE,
    () => false,
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

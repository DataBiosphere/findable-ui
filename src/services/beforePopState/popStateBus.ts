import Router from "next/router";
import { BeforePopStateCallback, NextHistoryState } from "./types";

/**
 * Pop‐State Event Bus
 *
 * Provides a centralized mechanism for components to intercept
 * and optionally prevent Back/Forward navigation (Next.js beforePopState).
 */

/**
 * A set of callback functions that will run before Next.js performs a pop.
 * Each callback returns `true` to allow navigation or `false` to block.
 */
const beforePopCallbacks = new Set<BeforePopStateCallback>();

/**
 * Register a callback to be invoked immediately before any Next.js pop navigation.
 * Return `false` from your callback to prevent the pop; otherwise return `true`.
 * @param cb - The callback function to register.
 */
export function registerBeforePopCallback(cb: BeforePopStateCallback): void {
  beforePopCallbacks.add(cb);
}

/**
 * Unregister a previously registered “before pop” callback.
 * @param cb - The callback function to unregister.
 */
export function unregisterBeforePopCallback(cb: BeforePopStateCallback): void {
  beforePopCallbacks.delete(cb);
}

/**
 * Ensures that we only hook into Next.js once. After install, any pop event
 * will first invoke all registered callbacks and only proceed if all return true.
 */
let hasInstalledInterceptor = false;

/**
 * Install the global “before pop” interceptor into Next.js’s router.
 * Subsequent calls to this function will be no‐ops.
 *
 * This method must be called once (e.g. in your app’s top‐level code)
 * to enable the pop‐state bus.
 */
export function registerPopStateHandler(): void {
  if (hasInstalledInterceptor) return;
  hasInstalledInterceptor = true;

  Router.beforePopState((state: NextHistoryState) => {
    // Iteratively call every callback. If any returns false, block navigation.
    let allAllow = true;
    beforePopCallbacks.forEach((cb) => {
      try {
        if (cb(state) === false) allAllow = false;
      } catch (e: unknown) {
        console.error("Pop listener failed:", e);
      }
    });

    return allAllow;
  });
}

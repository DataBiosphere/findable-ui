import Router from "next/router";

/**
 * Pop state event bus that allows components to register handlers for browser back/forward navigation.
 * This module provides a centralized way to intercept and potentially prevent navigation events.
 */

/**
 * Type representing the argument passed to pop state listeners.
 * Extracted from the Next.js Router.beforePopState API.
 */
type PopStateArg = Parameters<Parameters<typeof Router.beforePopState>[0]>[0];

/**
 * Function signature for pop state event listeners.
 * @param arg - The pop state event argument from Next.js Router.
 * @returns A boolean indicating whether to allow (true) or prevent (false) navigation.
 */
export type PopListener = (arg: PopStateArg) => boolean;

/**
 * Set of registered pop state listeners.
 */
const listeners = new Set<PopListener>();

/**
 * Registers a listener function to be called before navigation occurs.
 * @param fn - Callback function that returns boolean (true to allow navigation, false to prevent).
 */
export function addPopListener(fn: PopListener): void {
  listeners.add(fn);
  console.log("ADDING LISTENER", listeners.size);
}

/**
 * Unregisters a listener function.
 * @param fn - Callback function to unregister.
 */
export function removePopListener(fn: PopListener): void {
  listeners.delete(fn);
  console.log("REMOVING LISTENER", listeners.size);
}

/**
 * Flag to track whether the global handler has been installed.
 */
let installed = false;

/**
 * Registers the global pop state handler with Next.js router.
 * Only needs to be called once - subsequent calls have no effect.
 */
export function registerPopStateHandler(): void {
  if (installed) return;
  installed = true;

  Router.beforePopState((arg) => {
    let allow = true;
    listeners.forEach((cb) => {
      try {
        if (cb(arg) === false) allow = false;
      } catch (e: unknown) {
        console.error("Pop listener failed:", e);
      }
    });
    return allow;
  });
}

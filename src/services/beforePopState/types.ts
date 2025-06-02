import Router from "next/router";

/**
 * Type representing the callback function passed to beforePopState.
 * Extracted from the Next.js Router.beforePopState API.
 */
export type BeforePopStateCallback = Parameters<
  typeof Router.beforePopState
>[0];

/**
 * Type representing the state passed to beforePopState.
 * Extracted from the Next.js Router.beforePopState API.
 */
export type NextHistoryState = Parameters<BeforePopStateCallback>[0];

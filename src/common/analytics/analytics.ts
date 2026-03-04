import { getConfig } from "../../config/config";
import { DataLayer, EVENT_NAME, EventParams } from "./entities";

/**
 * Returns the GTM data layer for the environment, if enabled.
 * @returns google tag manager data layer.
 */
export function getDataLayer(): DataLayer | undefined {
  return window.dataLayer;
}

/**
 * Returns GTM ID for the site.
 * @returns google tag manager id.
 */
export function getGTMId(): string | undefined {
  return getConfig().analytics?.gtmId;
}

/**
 * Returns true if a GTM data layer exists for the environment.
 * @returns true a GTM data layer exits for the environment.
 */
function isTrackingEnabled(): boolean {
  return !!getDataLayer();
}

/**
 * Sends a custom event to GTM without params.
 * @param eventName - Event name.
 * @returns void.
 */
export function track(eventName: Exclude<EVENT_NAME, keyof EventParams>): void;
/**
 * Sends a custom event to GTM with params.
 * @param eventName - Event name.
 * @param params - Event params.
 * @returns void.
 */
export function track<E extends keyof EventParams>(
  eventName: E,
  params: EventParams[E],
): void;
export function track(eventName: EVENT_NAME, params?: unknown): void {
  if (!isTrackingEnabled()) {
    return;
  }
  const event = { event: eventName, params };
  getDataLayer().push(event);
}

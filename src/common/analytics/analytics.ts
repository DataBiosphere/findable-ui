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
 * Send custom event to GTM.
 * @param eventName - Event name.
 * @param params - Event params.
 */
export function track(
  eventName: EVENT_NAME,
  params: EventParams[typeof eventName]
): void {
  if (!isTrackingEnabled()) {
    return;
  }
  const event = { event: eventName, params: params };
  getDataLayer().push(event);
}

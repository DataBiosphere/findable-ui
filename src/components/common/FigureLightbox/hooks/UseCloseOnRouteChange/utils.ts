import type { RefObject } from "react";
import type { ControllerRef } from "yet-another-react-lightbox";
import type { RouteChangeOptions } from "./types";

/**
 * Returns a routeChangeStart listener that closes the lightbox, through its controller's close action, unless the change is shallow (a URL update on the same page).
 * @param controllerRef - Ref to the lightbox controller.
 * @returns The routeChangeStart listener.
 */
export function createRouteChangeStartListener(
  controllerRef: RefObject<ControllerRef | null>,
): (url: string, options?: RouteChangeOptions) => void {
  return (_url, options): void => {
    if (options?.shallow) return;
    controllerRef.current?.close();
  };
}

import type { RouteChangeOptions } from "./types";

/**
 * Returns a routeChangeStart listener that closes the lightbox, unless the change is shallow (a URL update on the same page).
 * @param onClose - Closes the lightbox.
 * @returns The routeChangeStart listener.
 */
export function createRouteChangeStartListener(
  onClose: () => void,
): (url: string, options?: RouteChangeOptions) => void {
  return (_url, options): void => {
    if (options?.shallow) return;
    onClose();
  };
}

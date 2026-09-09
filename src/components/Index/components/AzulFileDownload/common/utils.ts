import { ARIA_LABEL } from "./constants";

/**
 * Returns the accessible name for the download button. `isRequestPending` and
 * `isLoading` are independent — the request-pending flag is cleared as soon as
 * a file location returns, while the location request may still be loading —
 * so the name is derived from the icon actually rendered rather than from the
 * pending flag alone.
 * @param isLoading - Whether the file location request is in flight.
 * @returns The download button's accessible name.
 */
export function getDownloadLabel(isLoading: boolean): string {
  return isLoading ? ARIA_LABEL.DOWNLOAD_PENDING : ARIA_LABEL.DOWNLOAD;
}

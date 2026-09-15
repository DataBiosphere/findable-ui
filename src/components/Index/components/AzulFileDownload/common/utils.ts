import { ARIA_LABEL } from "./constants";

/**
 * Returns the accessible name for the download button, mirroring the icon the
 * button actually renders so a spinner is never announced as "Download file".
 * The loading branch is defensive rather than reachable today: `isLoading` is
 * only true while `isRequestPending` is also true, which renders the separate
 * pending button instead. See #1013 for collapsing the two into one control.
 * @param isLoading - Whether the file location request is in flight.
 * @returns The download button's accessible name.
 */
export function getDownloadLabel(isLoading: boolean): string {
  return isLoading ? ARIA_LABEL.DOWNLOAD_PENDING : ARIA_LABEL.DOWNLOAD;
}

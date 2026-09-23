import { ARIA_LABEL } from "./constants";

/**
 * Returns the accessible name for the download button, mirroring the icon the
 * button actually renders so a spinner is never announced as "Download file".
 * @param isRequestPending - Whether a file location request is in flight.
 * @returns The download button's accessible name.
 */
export function getDownloadLabel(isRequestPending: boolean): string {
  return isRequestPending ? ARIA_LABEL.DOWNLOAD_PENDING : ARIA_LABEL.DOWNLOAD;
}

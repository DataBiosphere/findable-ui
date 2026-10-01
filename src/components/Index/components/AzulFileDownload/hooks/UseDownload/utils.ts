/**
 * Points the hidden anchor at the resolved file location and clicks it, handing
 * the download to the browser.
 * @param downloadEl - Hidden anchor element.
 * @param fileUrl - Resolved file location.
 * @returns void.
 */
export function startDownload(
  downloadEl: HTMLAnchorElement,
  fileUrl: string,
): void {
  downloadEl.href = fileUrl;
  downloadEl.click();
}

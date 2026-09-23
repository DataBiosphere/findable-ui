import { useEffect, useRef, useState } from "react";
import { useFileLocation } from "../../../../../../hooks/useFileLocation";
import { useLoginGuard } from "../../../../../../providers/loginGuard/hook";
import { trackFileDownloaded } from "../../../../../Export/common/tracking";
import { UseDownload, UseDownloadProps } from "./types";
import { startDownload } from "./utils";

/**
 * Requests the file location from Azul and, once it resolves, hands the
 * download to the browser. Exposes the in-flight state so the button can
 * report itself as busy without unmounting.
 * @param props - Hook props.
 * @param props.entityName - The name of the file downloaded.
 * @param props.relatedEntityId - An array of IDs of the file's datasets / projects.
 * @param props.relatedEntityName - An array of names of the file's datasets / projects.
 * @param props.url - Original "file fetch URL" as returned from Azul endpoint.
 * @returns Hidden anchor ref, request state, and the download handler.
 */
export function useDownload({
  entityName,
  relatedEntityId,
  relatedEntityName,
  url,
}: UseDownloadProps): UseDownload {
  const { fileUrl, run } = useFileLocation(url);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [isRequestPending, setIsRequestPending] = useState(false);

  // Prompt user for login before download, if required.
  const { requireLogin } = useLoginGuard();

  // Initiates file download when file location request is successful.
  useEffect(() => {
    if (!fileUrl) return;
    if (!downloadRef.current) return;
    startDownload(downloadRef.current, fileUrl);
    setIsRequestPending(false);
  }, [fileUrl]);

  /**
   * Initiates file download when the download button is clicked, prompting the
   * user to log in first, if required. The button is aria-disabled rather than
   * disabled while a request is in flight, so it still receives clicks: ignore
   * those. The guard reads render state, so it rejects clicks from separate
   * events but not two activations dispatched within a single task.
   * @returns void.
   */
  const onDownload = (): void => {
    if (isRequestPending) return;
    requireLogin(requestDownload);
  };

  /**
   * Requests the file location, and tracks the download.
   * @returns void.
   */
  const requestDownload = (): void => {
    setIsRequestPending(true);
    trackFileDownloaded(entityName, relatedEntityId, relatedEntityName);
    run();
  };

  return { downloadRef, isRequestPending, onDownload };
}

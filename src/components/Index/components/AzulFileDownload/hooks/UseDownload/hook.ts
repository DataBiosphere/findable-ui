import { useEffect, useRef } from "react";
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
 * @param props.relatedEntityId - ID of the file's dataset / project.
 * @param props.relatedEntityName - Name of the file's dataset / project.
 * @param props.url - Original "file fetch URL" as returned from Azul endpoint.
 * @returns Hidden anchor ref, request state, and the download handler.
 */
export function useDownload({
  entityName,
  relatedEntityId,
  relatedEntityName,
  url,
}: UseDownloadProps): UseDownload {
  const { data, isLoading, run } = useFileLocation(url);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  // The URL the component currently shows.
  const urlRef = useRef(url);

  // The URL the most recent request was made for.
  const requestedUrlRef = useRef<string | undefined>(undefined);

  // Prompt user for login before download, if required.
  const { requireLogin } = useLoginGuard();

  // Keeps the URL ref current. Declared before the download effect so the ref
  // is updated first when both run in the same commit.
  useEffect(() => {
    urlRef.current = url;
  }, [url]);

  // Initiates file download each time a file location request resolves. Keyed
  // on the resolved object, not its location, so a request that resolves to
  // the same location as the last one still downloads. A request made for a
  // URL the component no longer shows, or one that resolves without a
  // location, is dropped.
  useEffect(() => {
    if (!data?.location) return;
    if (!downloadRef.current) return;
    if (requestedUrlRef.current !== urlRef.current) return;
    startDownload(downloadRef.current, data.location);
  }, [data]);

  /**
   * Initiates file download when the download button is clicked, prompting the
   * user to log in first, if required. The button is aria-disabled rather than
   * disabled while a request is in flight, so it still receives clicks: ignore
   * those. The guard reads render state, so it rejects clicks from separate
   * events but not two activations dispatched within a single task.
   * @returns void.
   */
  const onDownload = (): void => {
    if (isLoading) return;
    requireLogin(requestDownload);
  };

  /**
   * Requests the file location, and tracks the download. The login guard may
   * call this after login, from the render the click happened in: `run` sends
   * the latest token, but requests that render's URL, so that URL is recorded
   * and the download effect drops the request if the URL has since changed.
   * @returns void.
   */
  const requestDownload = (): void => {
    trackFileDownloaded(entityName, relatedEntityId, relatedEntityName);
    requestedUrlRef.current = url;
    run();
  };

  return { downloadRef, isRequestPending: isLoading, onDownload };
}

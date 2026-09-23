import { RefObject } from "react";

export interface UseDownload {
  downloadRef: RefObject<HTMLAnchorElement | null>; // Ref attached to the hidden anchor that performs the download.
  isRequestPending: boolean; // True while the file location request is in flight.
  onDownload: () => void; // Initiates the download.
}

export interface UseDownloadProps {
  entityName: string; // The name of the file downloaded.
  relatedEntityId: string; // An array of IDs of the file's datasets / projects
  relatedEntityName: string; // An array of names of the file's datasets / projects
  url?: string; // Original "file fetch URL" as returned from Azul endpoint.
}

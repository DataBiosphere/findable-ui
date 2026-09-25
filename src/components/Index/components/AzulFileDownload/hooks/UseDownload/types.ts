import { RefObject } from "react";

export interface UseDownload {
  downloadRef: RefObject<HTMLAnchorElement | null>; // Ref attached to the hidden anchor that performs the download.
  isRequestPending: boolean; // True while the file location request is in flight.
  onDownload: () => void; // Initiates the download.
}

export interface UseDownloadProps {
  entityName: string; // The name of the file downloaded.
  relatedEntityId: string; // ID of the file's dataset / project.
  relatedEntityName: string; // Name of the file's dataset / project.
  url?: string; // Original "file fetch URL" as returned from Azul endpoint.
}

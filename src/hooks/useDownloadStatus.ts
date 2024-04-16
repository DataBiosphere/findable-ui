import { useSystemStatus } from "./useSystemStatus";

enum DOWNLOAD_STATUS {
  DEFAULT = "DEFAULT",
  INDEXING = "INDEXING",
}

const DOWNLOAD_STATUS_MESSAGE = {
  DEFAULT: null,
  INDEXING: "Downloads and exports are disabled while indexing is in progress.",
};

export interface DownloadStatus {
  disabled: boolean;
  isLoading: boolean;
  message: string | null;
}

/**
 * Returns download status.
 * @returns download status.
 */
export const useDownloadStatus = (): DownloadStatus => {
  const { indexing, loading: isLoading } = useSystemStatus();
  const status = indexing ? DOWNLOAD_STATUS.INDEXING : DOWNLOAD_STATUS.DEFAULT;
  return {
    disabled: indexing,
    isLoading,
    message: DOWNLOAD_STATUS_MESSAGE[status],
  };
};

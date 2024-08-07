import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { API_FILE_LOCATION_FETCH } from "../../../../apis/azul/common/constants";
import { useRequestFileLocation } from "../../../../hooks/useRequestFileLocation";
import { DownloadIcon } from "../../../common/CustomIcon/components/DownloadIcon/downloadIcon";
import { LoadingIcon } from "../../../common/CustomIcon/components/LoadingIcon/loadingIcon";
import { IconButton } from "../../../common/IconButton/iconButton";
import { StyledIconButton } from "./azulFileDownload.styles";

export interface AzulFileDownloadProps {
  url?: string; // Original "file fetch URL" as returned from Azul endpoint.
}

export const AzulFileDownload = ({
  url,
}: AzulFileDownloadProps): JSX.Element => {
  const downloadRef = useRef<HTMLAnchorElement>(null);
  // Used to prevent the download button from being clicked twice
  const [isDownloading, setIsDownloading] = useState(false);
  // Correct the file fetch URL as per the Azul spec.
  const azulFetchUrl = buildFetchFileUrl(url);
  const { data, isLoading, isSuccess, run } =
    useRequestFileLocation(azulFetchUrl);
  const fileLocation = data?.location;

  // Initiates file download when file location request is successful.
  useEffect(() => {
    if (isSuccess && fileLocation && downloadRef.current) {
      const downloadEl = downloadRef.current;
      downloadEl.href = fileLocation;
      downloadEl.click();
      setIsDownloading(false);
    }
  }, [fileLocation, isLoading, isSuccess]);

  /**
   * Initiate file location request.
   */
  const onFileLocationRequested = async (): Promise<void> => {
    // Prevent duplicate downloads
    setIsDownloading(true);
    run();
  };

  if (isDownloading)
    return (
      <StyledIconButton color="primary" Icon={LoadingIcon} size="medium" />
    );

  return (
    <>
      <IconButton
        color="primary"
        disabled={!url}
        Icon={isLoading ? LoadingIcon : DownloadIcon}
        onClick={onFileLocationRequested}
        size="medium"
      />
      <Box component="a" download ref={downloadRef} sx={{ display: "none" }} />
    </>
  );
};

/**
 * Prepend "/fetch" to the path of the specified file URL, if not already included. See #1596.
 * @param fileUrl - Original file URL as returned from Azul.
 * @returns Complete and correct URL to use when requesting file location from Azul or undefined if no fileUrl is passed.
 */
function buildFetchFileUrl(fileUrl?: string): string | undefined {
  if (!fileUrl) {
    return;
  }

  try {
    const url = new URL(fileUrl);
    const path = url.pathname;
    if (!path.includes(API_FILE_LOCATION_FETCH)) {
      url.pathname = `${API_FILE_LOCATION_FETCH}${path}`;
    }
    return url.toString();
  } catch (error) {
    //console.log("error parsing file URL", fileUrl);
    return;
  }
}

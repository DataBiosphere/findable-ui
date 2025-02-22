import { Box } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useFileLocation } from "../../../../hooks/useFileLocation";
import { useLoginGuard } from "../../../../providers/loginGuard/hook";
import { DownloadIcon } from "../../../common/CustomIcon/components/DownloadIcon/downloadIcon";
import { LoadingIcon } from "../../../common/CustomIcon/components/LoadingIcon/loadingIcon";
import { IconButton } from "../../../common/IconButton/iconButton";
import { trackFileDownloaded } from "../../../Export/common/tracking";
import { StyledIconButton } from "./azulFileDownload.styles";
import {
  AZUL_FILE_DOWNLOAD_TEST_ID,
  AZUL_FILE_REQUEST_DOWNLOAD_PENDING_TEST_ID,
  AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID,
} from "./common/constants";

export interface AzulFileDownloadProps {
  entityName: string; // The name of the file downloaded.
  relatedEntityId: string; // An array of IDs of the file's datasets / projects
  relatedEntityName: string; // An array of names of the file's datasets / projects
  url?: string; // Original "file fetch URL" as returned from Azul endpoint.
}

export const AzulFileDownload = ({
  entityName,
  relatedEntityId,
  relatedEntityName,
  url,
}: AzulFileDownloadProps): JSX.Element => {
  const { fileUrl, isLoading, run } = useFileLocation(url);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [isRequestPending, setIsRequestPending] = useState(false);

  // Prompt user for login before download, if required.
  const { requireLogin } = useLoginGuard();

  // Initiates file download when file location request is successful.
  useEffect(() => {
    if (!fileUrl) return;
    if (!downloadRef.current) return;
    const downloadEl = downloadRef.current;
    downloadEl.href = fileUrl;
    downloadEl.click();
    setIsRequestPending(false);
  }, [fileUrl]);

  // Initiates file download when download button is clicked.
  const handleDownloadClick = (): void => {
    setIsRequestPending(true);
    trackFileDownloaded(entityName, relatedEntityId, relatedEntityName);
    run();
  };

  return (
    <Fragment>
      {isRequestPending ? (
        <StyledIconButton
          color="primary"
          data-testid={AZUL_FILE_REQUEST_DOWNLOAD_PENDING_TEST_ID}
          Icon={LoadingIcon}
          size="medium"
        />
      ) : (
        <IconButton
          color="primary"
          data-testid={AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID}
          disabled={!url}
          Icon={isLoading ? LoadingIcon : DownloadIcon}
          onClick={() => requireLogin(handleDownloadClick)}
          size="medium"
        />
      )}
      <Box
        component="a"
        data-testid={AZUL_FILE_DOWNLOAD_TEST_ID}
        download
        ref={downloadRef}
        sx={{ display: "none" }}
      />
    </Fragment>
  );
};

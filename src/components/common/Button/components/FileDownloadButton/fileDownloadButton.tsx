import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";

export interface FileDownloadButtonProps {
  fileName?: string;
  fileUrl?: string;
}

export const FileDownloadButton = ({
  fileName,
  fileUrl,
}: FileDownloadButtonProps): JSX.Element => {
  const downloadRef = useRef<HTMLAnchorElement>(null);

  // Initiates file download when file url request is successful.
  useEffect(() => {
    if (downloadRef.current && fileName && fileUrl) {
      downloadRef.current.setAttribute("href", fileUrl);
      downloadRef.current.setAttribute("download", fileName);
      downloadRef.current.click();
    }
  }, [fileName, fileUrl]);

  return (
    <Box component="a" download ref={downloadRef} sx={{ display: "none" }} />
  );
};

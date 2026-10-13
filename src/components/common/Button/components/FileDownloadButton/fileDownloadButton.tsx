import { Box } from "@mui/material";
import { JSX, useEffect, useRef } from "react";

/**
 * Props for the FileDownloadButton component.
 */
export interface FileDownloadButtonProps {
  fileName?: string;
  fileUrl?: string;
}

/**
 * Hidden anchor that downloads the file once both the file name and file url are set.
 * @param props - Component props.
 * @param props.fileName - Name to save the downloaded file as.
 * @param props.fileUrl - Url of the file to download.
 * @returns The hidden download anchor.
 */
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

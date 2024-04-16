import { Tooltip } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useDownloadStatus } from "../../../../../../hooks/useDownloadStatus";
import { Button } from "./exportButton.styles";

export const ExportButton = (): JSX.Element => {
  const { disabled, isLoading, message } = useDownloadStatus();
  return (
    <Tooltip arrow title={message}>
      <span>
        <Link href="/export" legacyBehavior passHref>
          <Button disabled={disabled || isLoading} href="passHref">
            Export
          </Button>
        </Link>
      </span>
    </Tooltip>
  );
};

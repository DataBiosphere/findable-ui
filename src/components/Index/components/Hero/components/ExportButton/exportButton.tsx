import { Tooltip } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useDownloadStatus } from "../../../../../../hooks/useDownloadStatus";
import { TEST_IDS } from "../../../../../../tests/testIds";
import { Button } from "./exportButton.styles";

export const ExportButton = (): JSX.Element => {
  const { disabled, isLoading, message } = useDownloadStatus();
  return (
    <Tooltip arrow title={message}>
      <span>
        <Link href="/export" legacyBehavior passHref>
          <Button
            data-testid={TEST_IDS.EXPORT_BUTTON}
            disabled={disabled || isLoading}
            href="passHref"
            id="button-cohort-export"
          >
            Export
          </Button>
        </Link>
      </span>
    </Tooltip>
  );
};

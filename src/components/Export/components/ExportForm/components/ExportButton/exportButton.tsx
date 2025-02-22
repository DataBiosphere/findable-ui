import { Tooltip } from "@mui/material";
import React, { ElementType, ReactNode } from "react";
import { useDownloadStatus } from "../../../../../../hooks/useDownloadStatus";
import { useFileManifestState } from "../../../../../../hooks/useFileManifestState";
import { useLoginGuard } from "../../../../../../providers/loginGuard/hook";
import { ButtonPrimary } from "../../../../../common/Button/components/ButtonPrimary/buttonPrimary";

export interface ExportButtonProps {
  Button?: ElementType;
  children: ReactNode;
  onClick?: () => void;
}

export const ExportButton = ({
  Button = ButtonPrimary,
  children,
  onClick,
}: ExportButtonProps): JSX.Element => {
  const downloadStatus = useDownloadStatus();
  const {
    fileManifestState: { isLoading },
  } = useFileManifestState();

  // Prompt user for login before export, if required.
  const { requireLogin } = useLoginGuard();

  return (
    <Tooltip arrow title={isLoading ? null : downloadStatus.message}>
      <span>
        <Button
          disabled={
            isLoading || downloadStatus.disabled || downloadStatus.isLoading
          }
          onClick={() => {
            requireLogin(onClick);
          }}
        >
          <span>{children}</span>
        </Button>
      </span>
    </Tooltip>
  );
};

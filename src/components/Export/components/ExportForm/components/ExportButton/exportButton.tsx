import { Tooltip } from "@mui/material";
import { ElementType, JSX, ReactNode } from "react";
import { useDownloadStatus } from "../../../../../../hooks/useDownloadStatus";
import { useFileManifestState } from "../../../../../../hooks/useFileManifestState";
import { useLoginGuard } from "../../../../../../providers/loginGuard/hook";
import { ButtonPrimary } from "../../../../../common/Button/components/ButtonPrimary/buttonPrimary";

/**
 * Props for the ExportButton component.
 */
export interface ExportButtonProps {
  Button?: ElementType;
  children: ReactNode;
  onClick?: () => void;
}

/**
 * Export form submit button. Disabled while the file manifest is loading, while
 * downloads are disabled during indexing (with a tooltip saying so) and while
 * the system status is loading. A click prompts the user to log in first when
 * exports require it and they are not logged in.
 * @param props - Component props.
 * @param props.Button - Button component; defaults to ButtonPrimary.
 * @param props.children - Button label.
 * @param props.onClick - Invoked on click, after login when login is required.
 * @returns The export button.
 */
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

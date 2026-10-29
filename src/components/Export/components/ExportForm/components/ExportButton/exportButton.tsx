import { Button as MButton, Tooltip } from "@mui/material";
import { ElementType, JSX, ReactNode } from "react";
import { useDownloadStatus } from "../../../../../../hooks/useDownloadStatus";
import { useFileManifestState } from "../../../../../../hooks/useFileManifestState";
import { useLoginGuard } from "../../../../../../providers/loginGuard/hook";
import { BUTTON_PROPS } from "../../../../../common/Button/constants";

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
 * The button is always given the primary contained preset (color and variant),
 * including a Button passed in, so a passed-in button that spreads its props
 * after its own color and variant (e.g. ButtonOutline) renders primary contained.
 * @param props - Component props.
 * @param props.Button - Button component, given the primary contained preset; defaults to MUI Button.
 * @param props.children - Button label.
 * @param props.onClick - Invoked on click, after login when login is required.
 * @returns The export button.
 */
export const ExportButton = ({
  Button = MButton,
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
          {...BUTTON_PROPS.PRIMARY_CONTAINED}
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

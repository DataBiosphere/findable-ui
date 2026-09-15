import { ContentCopyRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import copy from "copy-to-clipboard";
import { JSX, useEffect, useState } from "react";
import { ARIA_LABEL } from "./constants";

export interface CopyToClipboardProps {
  copyStr: string;
}

export const CopyToClipboard = ({
  copyStr,
}: CopyToClipboardProps): JSX.Element => {
  const [showTooltip, setShowTooltip] = useState(false);

  /**
   * Copies string to clipboard and sets showTooltip state to true.
   * @param str - String to copy to clipboard.
   */
  const onCopyToClipboard = (str: string): void => {
    copy(str);
    setShowTooltip(true);
  };

  // Timer to auto close the tooltip - the state showTooltip is set to false after a specified time (2 seconds).
  useEffect(() => {
    if (showTooltip) {
      const tooltipTimeout = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
      return (): void => clearTimeout(tooltipTimeout);
    }
  }, [showTooltip]);

  return (
    <Tooltip
      arrow
      disableHoverListener
      open={showTooltip}
      placement="top"
      title={"Link Copied"}
    >
      {/*
       * MUI copies a string Tooltip title onto the child as aria-label, which
       * would name this button after the post-copy confirmation ("Link Copied")
       * rather than the action it performs. An explicit aria-label wins, so the
       * name describes the action and the tooltip stays the confirmation.
       */}
      <IconButton
        aria-label={ARIA_LABEL.COPY}
        onClick={(): void => onCopyToClipboard(copyStr)}
        size="xxsmall"
      >
        <ContentCopyRounded color="primary" fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

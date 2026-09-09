import { CloseRounded } from "@mui/icons-material";
import { IconButtonProps } from "@mui/material";
import { JSX } from "react";
import { resolveAriaLabel } from "../../../../../../../utils/ariaLabel";
import { useDrawer } from "../../../../../../common/Drawer/provider/hook";
import { BaseComponentProps } from "../../../../../../types";
import { ARIA_LABEL, ICON_BUTTON_PROPS, SVG_ICON_PROPS } from "./constants";
import { StyledIconButton } from "./iconButton.styles";

/**
 * Closes facet-filters drawer.
 */

export const IconButton = ({
  className,
  ...props /* MuiIconButtonProps */
}: BaseComponentProps & IconButtonProps): JSX.Element | null => {
  const { onClose } = useDrawer();
  return (
    <StyledIconButton
      {...ICON_BUTTON_PROPS}
      className={className}
      onClick={onClose}
      {...props}
      // Applied after the spread so a consumer can name this button for its own
      // surface (the nested category panel does), but cannot blank the name:
      // a blank aria-label is discarded, leaving the icon-only button unnamed.
      aria-label={resolveAriaLabel(props["aria-label"], ARIA_LABEL.CLOSE)}
    >
      <CloseRounded {...SVG_ICON_PROPS} />
    </StyledIconButton>
  );
};

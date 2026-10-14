import { CloseRounded } from "@mui/icons-material";
import { IconButtonProps } from "@mui/material";
import { JSX } from "react";
import { resolveAriaLabel } from "../../../../../../../utils/ariaLabel";
import { useDrawer } from "../../../../../../common/Drawer/provider/hook";
import { BaseComponentProps } from "../../../../../../types";
import { ARIA_LABEL, ICON_BUTTON_PROPS, SVG_ICON_PROPS } from "./constants";
import { StyledIconButton } from "./iconButton.styles";

/**
 * Close icon button that closes the filters drawer, named by the given aria-label; a missing or blank value falls back to ARIA_LABEL.CLOSE.
 * The given Mui IconButton props override the defaults, including the click handler.
 * @param props - Component props.
 * @param props.className - Class name applied to the button.
 * @returns The close button.
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

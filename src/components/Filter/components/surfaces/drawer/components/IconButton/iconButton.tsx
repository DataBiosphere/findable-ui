import { CloseRounded } from "@mui/icons-material";
import { IconButtonProps } from "@mui/material";
import { JSX } from "react";
import { useDrawer } from "../../../../../../common/Drawer/provider/hook";
import { BaseComponentProps } from "../../../../../../types";
import { ICON_BUTTON_PROPS, SVG_ICON_PROPS } from "./constants";
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
    >
      <CloseRounded {...SVG_ICON_PROPS} />
    </StyledIconButton>
  );
};

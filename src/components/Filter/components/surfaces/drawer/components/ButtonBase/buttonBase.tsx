import { ButtonProps } from "@mui/material";
import { JSX } from "react";
import { SVG_ICON_PROPS } from "../../../../../../../styles/common/mui/svgIcon";
import { SouthIcon } from "../../../../../../common/CustomIcon/components/SouthIcon/southIcon";
import { useDrawer } from "../../../../../../common/Drawer/provider/hook";
import { BaseComponentProps } from "../../../../../../types";
import { StyledButtonBase } from "./buttonBase.styles";

/**
 * Closes facet-filter drawer.
 */

export const ButtonBase = ({
  children,
  className,
  ...props
}: BaseComponentProps & ButtonProps): JSX.Element => {
  const { onClose } = useDrawer();
  return (
    <StyledButtonBase className={className} onClick={onClose} {...props}>
      <SouthIcon fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL} />
      {children}
    </StyledButtonBase>
  );
};

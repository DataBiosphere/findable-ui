import { ButtonProps } from "@mui/material";
import { JSX } from "react";
import { SVG_ICON_PROPS } from "../../../../../../../styles/common/mui/svgIcon";
import { SouthIcon } from "../../../../../../common/CustomIcon/components/SouthIcon/southIcon";
import { useDrawer } from "../../../../../../common/Drawer/provider/hook";
import { BaseComponentProps } from "../../../../../../types";
import { StyledButtonBase } from "./buttonBase.styles";

/**
 * Button with a south arrow icon before its children that closes the filters drawer, unless an onClick prop replaces that (as the filter menu and range do, to close the filter panel).
 * The given Mui Button props override the defaults, including the click handler.
 * @param props - Component props.
 * @param props.children - Button content.
 * @param props.className - Class name applied to the button.
 * @returns The button.
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

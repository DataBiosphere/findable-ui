import { CloseRounded } from "@mui/icons-material";
import { JSX } from "react";
import { ICON_BUTTON_PROPS } from "../../../../../../styles/common/mui/iconButton";
import { SVG_ICON_PROPS } from "../../../../../../styles/common/mui/svgIcon";
import { StyledIconButton } from "./iconButton.styles";
import { DrawerProps } from "@mui/material";
import { DRAWER_PROPS } from "../../../../../../styles/common/mui/drawer";
import { useDrawer } from "../../../../../../components/common/Drawer/provider/hook";

export const IconButton = ({
  variant,
}: Pick<DrawerProps, "variant">): JSX.Element | null => {
  const { onClose } = useDrawer();
  if (variant === DRAWER_PROPS.VARIANT.PERSISTENT) return null;

  return (
    <StyledIconButton onClick={onClose} size={ICON_BUTTON_PROPS.SIZE.MEDIUM}>
      <CloseRounded fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL} />
    </StyledIconButton>
  );
};

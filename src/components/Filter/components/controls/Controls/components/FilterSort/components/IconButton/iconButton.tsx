import { SettingsOutlined } from "@mui/icons-material";
import React from "react";
import { ICON_BUTTON_PROPS } from "../../../../../../../../../styles/common/mui/iconButton";
import { TEST_IDS } from "../../../../../../../../../tests/testIds";
import { SVG_ICON_PROPS } from "./constants";
import { StyledIconButton } from "./iconButton.styles";
import { IconButtonProps } from "./types";

export const IconButton = ({
  onClick,
  open = false,
}: IconButtonProps): JSX.Element => {
  return (
    <StyledIconButton
      color={ICON_BUTTON_PROPS.COLOR.INK_LIGHT}
      data-testid={TEST_IDS.FILTER_SORT_BUTTON}
      onClick={onClick}
      open={open}
    >
      <SettingsOutlined {...SVG_ICON_PROPS} />
    </StyledIconButton>
  );
};

import type { ToggleButtonGroupProps } from "@mui/material";
import { TOGGLE_BUTTON_PROPS } from "../../../../../../styles/common/mui/toggleButton";

export const TOGGLE_BUTTON_GROUP_PROPS: Partial<ToggleButtonGroupProps> = {
  "aria-label": "Column presets",
  exclusive: true,
  size: TOGGLE_BUTTON_PROPS.SIZE.SMALL,
};

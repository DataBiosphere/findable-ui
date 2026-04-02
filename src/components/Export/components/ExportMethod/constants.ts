import { ChipProps } from "@mui/material";
import { CHIP_PROPS as MUI_CHIP_PROPS } from "../../../../styles/common/mui/chip";

export const CHIP_PROPS: Partial<ChipProps> = {
  color: MUI_CHIP_PROPS.COLOR.DEFAULT,
  label: "Coming Soon",
  variant: MUI_CHIP_PROPS.VARIANT.STATUS,
};

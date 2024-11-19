import { ChipProps, TooltipProps } from "@mui/material";
import { CHIP_PROPS as MUI_CHIP_PROPS } from "../../../../../../styles/common/mui/chip";

export const CHIP_PROPS: Partial<ChipProps> = {
  color: MUI_CHIP_PROPS.COLOR.DEFAULT,
  size: MUI_CHIP_PROPS.SIZE.SMALL,
};

export const TOOLTIP_PROPS: Partial<TooltipProps> = {
  arrow: true,
  slotProps: {
    popper: {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, -4],
          },
        },
        {
          name: "preventOverflow",
          options: { padding: 8 },
        },
      ],
    },
    tooltip: {
      sx: { maxWidth: "none" },
    },
  },
};
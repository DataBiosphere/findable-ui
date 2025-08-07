import { TooltipProps } from "@mui/material";
import { FONT } from "../../../../styles/common/constants/font";
import { PALETTE } from "../../../../styles/common/constants/palette";

export const TOOLTIP_PROPS: Omit<TooltipProps, "children" | "title"> = {
  arrow: true,
  disableInteractive: true,
  enterNextDelay: 250,
  slotProps: {
    arrow: { sx: { color: PALETTE.COMMON_WHITE } },
    popper: {
      modifiers: [
        { name: "offset", options: { offset: [0, 2] } },
        { name: "preventOverflow", options: { padding: 8 } },
      ],
    },
    tooltip: {
      sx: {
        backgroundColor: PALETTE.COMMON_WHITE,
        borderRadius: 2,
        color: PALETTE.INK_MAIN,
        font: FONT.BODY_SMALL_400_2_LINES,
        padding: 4,
      },
    },
  },
};

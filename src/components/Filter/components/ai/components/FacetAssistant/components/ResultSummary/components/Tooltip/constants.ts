import { TooltipProps } from "@mui/material";
import { FONT } from "../../../../../../../../../../styles/common/constants/font";
import { PALETTE } from "../../../../../../../../../../styles/common/constants/palette";

export const TOOLTIP_PROPS: Omit<TooltipProps, "children" | "title"> = {
  disableInteractive: true,
  enterNextDelay: 250,
  placement: "top-start",
  slotProps: {
    popper: {
      modifiers: [
        { name: "flip", options: { padding: 8 } },
        { name: "offset", options: { offset: [0, 2] } },
        { name: "preventOverflow", options: { padding: 8 } },
      ],
    },
    tooltip: {
      sx: {
        backgroundColor: PALETTE.COMMON_WHITE,
        border: `1px solid ${PALETTE.SMOKE_DARK}`,
        color: PALETTE.INK_MAIN,
        font: FONT.BODY_400,
        margin: 0,
        maxWidth: "unset",
        padding: 4,
      },
    },
  },
};

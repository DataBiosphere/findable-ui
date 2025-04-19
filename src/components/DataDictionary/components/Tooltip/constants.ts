import { TooltipProps } from "@mui/material";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";

export const TOOLTIP_PROPS: Omit<TooltipProps, "children" | "title"> = {
  arrow: true,
  disableInteractive: true,
  enterNextDelay: 250,
  slotProps: {
    arrow: { sx: (theme) => ({ color: theme.palette.common.white }) },
    popper: {
      modifiers: [
        { name: "offset", options: { offset: [0, 2] } },
        { name: "preventOverflow", options: { padding: 8 } },
      ],
    },
    tooltip: {
      sx: (theme) => ({
        ...theme.typography[TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES],
        backgroundColor: theme.palette.common.white,
        borderRadius: 2,
        color: theme.palette.ink.main,
        padding: 4,
      }),
    },
  },
};

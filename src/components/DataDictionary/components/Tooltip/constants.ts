import { TooltipProps } from "@mui/material";
import { TEXT_BODY_SMALL_400_2_LINES } from "../../../../theme/common/typography";

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
        ...theme.typography[TEXT_BODY_SMALL_400_2_LINES],
        backgroundColor: theme.palette.common.white,
        borderRadius: 2,
        color: theme.palette.ink.main,
        padding: 4,
      }),
    },
  },
};

import { TooltipProps } from "@mui/material";

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
        ...theme.typography["body-small-400-2lines"],
        backgroundColor: theme.palette.common.white,
        borderRadius: 2,
        color: theme.palette.ink.main,
        padding: 4,
      }),
    },
  },
};

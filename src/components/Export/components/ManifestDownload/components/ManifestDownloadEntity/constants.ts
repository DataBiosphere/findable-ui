import { TooltipProps } from "@mui/material";

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

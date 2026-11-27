import { SouthRounded } from "@mui/icons-material";
import type { Components, Theme } from "@mui/material";

export const MuiTableSortLabel: Components<Theme>["MuiTableSortLabel"] = {
  defaultProps: {
    IconComponent: SouthRounded,
  },
  styleOverrides: {
    icon: {
      fontSize: 20,
      margin: 0,
      transition: "none",
    },
    root: {
      flex: 1,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-active": {
        color: "inherit",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiTableSortLabel-icon": {
          color: "inherit",
        },
      },
      "&:hover": {
        color: "inherit",
        opacity: 0.6,
      },
    },
  },
};

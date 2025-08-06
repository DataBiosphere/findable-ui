import { Components } from "@mui/material";

const TEXT_BODY_500 = "text-body-500";

export const MuiAlertTitle: Components["MuiAlertTitle"] = {
  defaultProps: {
    gutterBottom: false,
    variant: TEXT_BODY_500,
  },
  styleOverrides: {
    root: {
      margin: 0,
    },
  },
};

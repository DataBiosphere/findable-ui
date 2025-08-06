import { Components } from "@mui/material";

const BODY_500 = "body-500";

export const MuiAlertTitle: Components["MuiAlertTitle"] = {
  defaultProps: {
    gutterBottom: false,
    variant: BODY_500,
  },
  styleOverrides: {
    root: {
      margin: 0,
    },
  },
};

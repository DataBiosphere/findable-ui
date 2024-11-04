import { Components } from "@mui/material";
import { TEXT_BODY_500 } from "../common/typography";

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

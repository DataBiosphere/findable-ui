import { Components } from "@mui/material";
import { TYPOGRAPHY_PROPS } from "../../styles/common/mui/typography";

export const MuiAlertTitle: Components["MuiAlertTitle"] = {
  defaultProps: {
    gutterBottom: false,
    variant: TYPOGRAPHY_PROPS.VARIANT.BODY_500,
  },
  styleOverrides: {
    root: {
      margin: 0,
    },
  },
};

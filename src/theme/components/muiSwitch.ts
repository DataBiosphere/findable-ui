import { Components } from "@mui/material";
import { PALETTE } from "../../styles/common/constants/palette";

export const MuiSwitch: Components["MuiSwitch"] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: {
      height: 20,
      padding: 0,
      width: 38,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      variants: [
        {
          props: { color: "purple" },
          style: {
            ".Mui-checked +.MuiSwitch-track": {
              backgroundColor: PALETTE.PURPLE_MAIN,
            },
          },
        },
      ],
    },
    switchBase: {
      padding: 2,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:hover": {
        backgroundColor: "transparent",
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-checked": {
        color: PALETTE.COMMON_WHITE,
        transform: "translateX(18px)",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: "transparent",
        },
        "+.MuiSwitch-track": {
          opacity: 1,
        },
      },
    },
    thumb: {
      height: 16,
      width: 16,
    },
    track: {
      backgroundColor: PALETTE.SMOKE_MAIN,
      borderRadius: 100,
      opacity: 1,
    },
  },
};

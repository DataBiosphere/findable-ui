import { Components } from "@mui/material";
import { COLOR_MIXES } from "../../styles/common/constants/colorMixes";
import { PALETTE } from "../../styles/common/constants/palette";
import { BUTTON_GROUP_PROPS } from "../../styles/common/mui/buttonGroup";

const SELECTORS = {
  GROUPED: `.${BUTTON_GROUP_PROPS.CLASSES.GROUPED}`,
};

export const MuiButtonGroup: Components["MuiButtonGroup"] = {
  defaultProps: {
    disableElevation: true,
    disableRipple: true,
  },
  styleOverrides: {
    root: {
      variants: [
        /* PRIMARY CONTAINED */
        {
          props: {
            color: BUTTON_GROUP_PROPS.COLOR.PRIMARY,
            variant: BUTTON_GROUP_PROPS.VARIANT.CONTAINED,
          },
          style: {
            [SELECTORS.GROUPED]: {
              borderColor: PALETTE.PRIMARY_DARK,
              boxShadow: `0 1px 0 0 ${PALETTE.PRIMARY_DARK}`,
              minWidth: 0,
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "&:hover": {
                boxShadow: `0 1px 0 0 ${PALETTE.PRIMARY_DARK}`,
              },
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "&:active": {
                boxShadow: "none",
              },
            },
          },
        },
        /* SECONDARY OUTLINED */
        {
          props: {
            color: BUTTON_GROUP_PROPS.COLOR.SECONDARY,
            variant: BUTTON_GROUP_PROPS.VARIANT.OUTLINED,
          },
          style: {
            [SELECTORS.GROUPED]: {
              backgroundColor: PALETTE.COMMON_WHITE,
              boxShadow: `inset 0 0 0 1px ${PALETTE.SMOKE_DARK}, 0 1px 0 0 ${COLOR_MIXES.COMMON_BLACK_08}`,
              color: PALETTE.INK_MAIN,
              minWidth: 0,
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "&:hover": {
                backgroundColor: PALETTE.SMOKE_LIGHTEST,
                boxShadow: `inset 0 0 0 1px ${PALETTE.SMOKE_DARK}, 0 1px 0 0 ${COLOR_MIXES.COMMON_BLACK_08}`,
              },
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "&:active": {
                backgroundColor: PALETTE.SMOKE_LIGHTEST,
                boxShadow: `inset 0 0 0 1px ${PALETTE.SMOKE_DARK}`,
              },
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "&.Mui-focusVisible": {
                boxShadow: `inset 0 0 0 1px ${PALETTE.SMOKE_DARK}, 0 1px 0 0 ${COLOR_MIXES.COMMON_BLACK_08}`,
              },
            },
          },
        },
        /* SMALL */
        {
          props: {
            size: BUTTON_GROUP_PROPS.SIZE.SMALL,
          },
          style: {
            [SELECTORS.GROUPED]: {
              padding: "6px 8px",
            },
          },
        },
      ],
    },
  },
};

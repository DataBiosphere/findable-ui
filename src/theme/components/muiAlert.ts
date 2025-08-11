import { Components } from "@mui/material";
import { ErrorIcon } from "../../components/common/CustomIcon/components/ErrorIcon/errorIcon";
import { InfoIcon } from "../../components/common/CustomIcon/components/InfoIcon/infoIcon";
import { SuccessIcon } from "../../components/common/CustomIcon/components/SuccessIcon/successIcon";
import { WarningIcon } from "../../components/common/CustomIcon/components/WarningIcon/warningIcon";
import { COLOR_MIXES } from "../../styles/common/constants/colorMixes";
import { FONT } from "../../styles/common/constants/font";
import { PALETTE } from "../../styles/common/constants/palette";
import { SIZE } from "../../styles/common/constants/size";
import { COLOR, SEVERITY, VARIANT } from "../../styles/common/mui/alert";
import { FONT_SIZE } from "../../styles/common/mui/icon";

export const MuiAlert: Components["MuiAlert"] = {
  defaultProps: {
    elevation: 1,
    iconMapping: {
      error: ErrorIcon({ fontSize: FONT_SIZE.SMALL }),
      info: InfoIcon({ fontSize: FONT_SIZE.SMALL }),
      success: SuccessIcon({ fontSize: FONT_SIZE.SMALL }),
      warning: WarningIcon({ fontSize: FONT_SIZE.SMALL }),
    },
    size: SIZE.MEDIUM,
  },
  styleOverrides: {
    icon: {
      opacity: 1,
      padding: 0,
    },
    message: {
      display: "grid",
      font: FONT.BODY_500,
      gap: 4,
      padding: 0,
    },
    root: {
      alignItems: "flex-start",
      borderRadius: 8,
      color: PALETTE.INK_MAIN,
      padding: 16,
      variants: [
        {
          props: { severity: SEVERITY.ERROR },
          style: {
            backgroundColor: PALETTE.ALERT_LIGHTEST,
            border: `1px solid ${COLOR_MIXES.ALERT_MAIN_32}`,
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "& .MuiAlert-icon": {
              color: PALETTE.ALERT_MAIN,
            },
          },
        },
        {
          props: { severity: SEVERITY.INFO },
          style: {
            backgroundColor: PALETTE.INFO_LIGHTEST,
            border: `1px solid ${COLOR_MIXES.INFO_MAIN_32}`,
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "& .MuiAlert-icon": {
              color: PALETTE.INFO_MAIN,
            },
          },
        },
        {
          props: { severity: SEVERITY.SUCCESS },
          style: {
            backgroundColor: PALETTE.SUCCESS_LIGHTEST,
            border: `1px solid ${COLOR_MIXES.SUCCESS_MAIN_32}`,
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "& .MuiAlert-icon": {
              color: PALETTE.SUCCESS_MAIN,
            },
          },
        },
        {
          props: { severity: SEVERITY.WARNING },
          style: {
            backgroundColor: PALETTE.WARNING_LIGHTEST,
            border: `1px solid ${COLOR_MIXES.WARNING_MAIN_32}`,
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "& .MuiAlert-icon": {
              color: PALETTE.WARNING_MAIN,
            },
          },
        },
        {
          props: { color: COLOR.INK },
          style: {
            backgroundColor: PALETTE.INK_MAIN,
            color: PALETTE.COMMON_WHITE,
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            ".MuiLink-root": {
              color: PALETTE.COMMON_WHITE,
            },
          },
        },
        {
          props: { color: COLOR.PRIMARY },
          style: {
            backgroundColor: PALETTE.PRIMARY_MAIN,
            color: PALETTE.COMMON_WHITE,
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            ".MuiLink-root": {
              color: PALETTE.COMMON_WHITE,
            },
          },
        },
        {
          props: { color: COLOR.SMOKE },
          style: {
            backgroundColor: PALETTE.SMOKE_LIGHT,
          },
        },
        {
          props: { variant: VARIANT.FILLED },
          style: {
            border: "none",
          },
        },
      ],
    },
  },
};

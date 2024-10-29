import { Components, Theme } from "@mui/material";
import { ErrorIcon } from "../../components/common/CustomIcon/components/ErrorIcon/errorIcon";
import { InfoIcon } from "../../components/common/CustomIcon/components/InfoIcon/infoIcon";
import { SuccessIcon } from "../../components/common/CustomIcon/components/SuccessIcon/successIcon";
import { WarningIcon } from "../../components/common/CustomIcon/components/WarningIcon/warningIcon";
import { COLOR, SEVERITY, VARIANT } from "../../styles/common/mui/alert";
import { FONT_SIZE } from "../../styles/common/mui/icon";
import { alpha32 } from "../common/palette";
import { TEXT_BODY_400_2_LINES, TEXT_BODY_500 } from "../common/typography";

export const MuiAlert = (theme: Theme): Components["MuiAlert"] => {
  return {
    defaultProps: {
      elevation: 1,
      iconMapping: {
        error: ErrorIcon({ fontSize: FONT_SIZE.SMALL }),
        info: InfoIcon({ fontSize: FONT_SIZE.SMALL }),
        success: SuccessIcon({ fontSize: FONT_SIZE.SMALL }),
        warning: WarningIcon({ fontSize: FONT_SIZE.SMALL }),
      },
    },
    styleOverrides: {
      icon: {
        opacity: 1,
        padding: 0,
      },
      message: {
        ...theme.typography[TEXT_BODY_400_2_LINES],
        display: "grid",
        gap: 4,
        padding: 0,
      },
      root: {
        alignItems: "flex-start",
        borderRadius: 8,
        color: theme.palette.ink.main,
        padding: 16,
        variants: [
          {
            props: { severity: "info", variant: "neutral" },
            style: {
              backgroundColor: theme.palette.smoke.light,
              padding: 16,
            },
          }, // TODO(cc) remove this variant when all alerts are updated.
          {
            props: { variant: "banner" },
            style: {
              padding: 16,
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "& .MuiAlert-icon": {
                padding: 0,
              },
              "& .MuiAlertTitle-root": {
                ...theme.typography[TEXT_BODY_500],
              },
            },
          }, // TODO(cc) remove this variant when all alerts are updated.
          {
            props: { severity: SEVERITY.ERROR },
            style: {
              backgroundColor: theme.palette.alert.lightest,
              border: `1px solid ${theme.palette.alert.main}${alpha32}`,
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "& .MuiAlert-icon": {
                color: theme.palette.alert.main,
              },
            },
          },
          {
            props: { severity: SEVERITY.INFO },
            style: {
              backgroundColor: theme.palette.info.lightest,
              border: `1px solid ${theme.palette.info.main}${alpha32}`,
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "& .MuiAlert-icon": {
                color: theme.palette.info.main,
              },
            },
          },
          {
            props: { severity: SEVERITY.SUCCESS },
            style: {
              backgroundColor: theme.palette.success.lightest,
              border: `1px solid ${theme.palette.success.main}${alpha32}`,
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "& .MuiAlert-icon": {
                color: theme.palette.success.main,
              },
            },
          },
          {
            props: { severity: SEVERITY.WARNING },
            style: {
              backgroundColor: theme.palette.warning.lightest,
              border: `1px solid ${theme.palette.warning.main}${alpha32}`,
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "& .MuiAlert-icon": {
                color: theme.palette.warning.main,
              },
            },
          },
          {
            props: { color: COLOR.INK },
            style: {
              backgroundColor: theme.palette.ink.main,
              color: theme.palette.common.white,
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              ".MuiLink-root": {
                color: theme.palette.common.white,
              },
            },
          },
          {
            props: { color: COLOR.PRIMARY },
            style: {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              ".MuiLink-root": {
                color: theme.palette.common.white,
              },
            },
          },
          {
            props: { color: COLOR.SMOKE },
            style: {
              backgroundColor: theme.palette.smoke.light,
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
      standard: {
        padding: 20,
      },
    },
  };
};
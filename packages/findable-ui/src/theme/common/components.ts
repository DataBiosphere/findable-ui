import { Components, Theme } from "@mui/material";
import { ErrorIcon } from "../../components/common/CustomIcon/components/ErrorIcon/errorIcon";
import { InfoIcon } from "../../components/common/CustomIcon/components/InfoIcon/infoIcon";
import { SuccessIcon } from "../../components/common/CustomIcon/components/SuccessIcon/successIcon";
import { WarningIcon } from "../../components/common/CustomIcon/components/WarningIcon/warningIcon";
import { desktopSmUp, desktopUp, mobileUp, tabletUp } from "./breakpoints";
import { alpha32, alpha60, alpha80, black04, white } from "./palette";
import { strokeBottom, strokeTop } from "./shadows";
import {
  TEXT_BODY_400,
  TEXT_BODY_400_2_LINES,
  TEXT_BODY_500,
  TEXT_BODY_LARGE_500,
  TEXT_BODY_SMALL_400,
  TEXT_BODY_SMALL_500,
  TEXT_HEADING,
} from "./typography";

// Constants
const FLEX_START = "flex-start";

/**
 * MuiAlert Component
 * @param theme - Theme.
 * @returns MuiAlert component theme styles.
 */
export const MuiAlert = (theme: Theme): Components["MuiAlert"] => {
  return {
    defaultProps: {
      iconMapping: {
        error: ErrorIcon({ fontSize: "small" }),
        info: InfoIcon({ fontSize: "small" }),
        success: SuccessIcon({ fontSize: "small" }),
        warning: WarningIcon({ fontSize: "small" }),
      },
    },
    styleOverrides: {
      icon: {
        opacity: 1,
        padding: "2px 0",
      },
      message: {
        padding: 0,
      },
      root: {
        ...theme.typography[TEXT_BODY_400_2_LINES],
        borderRadius: 8,
        boxShadow: theme.shadows[1], // elevation01
        color: theme.palette.ink.main,
      },
      standard: {
        alignItems: FLEX_START,
        padding: 20,
      },
      standardError: {
        backgroundColor: theme.palette.alert.lightest,
        border: `1px solid ${theme.palette.alert.main}${alpha32}`,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiAlert-icon": {
          color: theme.palette.alert.main,
        },
      },
      standardInfo: {
        backgroundColor: theme.palette.info.lightest,
        border: `1px solid ${theme.palette.info.main}${alpha32}`,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiAlert-icon": {
          color: theme.palette.info.main,
        },
      },
      standardSuccess: {
        backgroundColor: theme.palette.success.lightest,
        border: `1px solid ${theme.palette.success.main}${alpha32}`,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiAlert-icon": {
          color: theme.palette.success.main,
        },
      },
      standardWarning: {
        backgroundColor: theme.palette.warning.lightest,
        border: `1px solid ${theme.palette.warning.main}${alpha32}`,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiAlert-icon": {
          color: theme.palette.warning.main,
        },
      },
    },
    variants: [
      {
        props: { severity: "info", variant: "neutral" },
        style: {
          backgroundColor: theme.palette.smoke.light,
          padding: 16,
        },
      },
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
      },
      {
        props: { severity: "error", variant: "banner" },
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
        props: { severity: "info", variant: "banner" },
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
        props: { severity: "success", variant: "banner" },
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
        props: { severity: "warning", variant: "banner" },
        style: {
          backgroundColor: theme.palette.warning.lightest,
          border: `1px solid ${theme.palette.warning.main}${alpha32}`,
          // eslint-disable-next-line sort-keys -- disabling key order for readability
          "& .MuiAlert-icon": {
            color: theme.palette.warning.main,
          },
        },
      },
    ],
  };
};

/**
 * MuiAlertTitle Component
 * @param theme - Theme.
 * @returns MuiAlertTitle component theme styles.
 */
export const MuiAlertTitle = (theme: Theme): Components["MuiAlertTitle"] => {
  return {
    styleOverrides: {
      root: {
        ...theme.typography[TEXT_BODY_LARGE_500],
        margin: 0,
      },
    },
  };
};

/**
 * MuiAppBar Component
 */
export const MuiAppBar: Components["MuiAppBar"] = {
  defaultProps: {
    color: "default",
    elevation: 0,
    position: "static",
  },
  styleOverrides: {
    colorDefault: {
      backgroundColor: white,
    },
  },
};

/**
 * MuiBackdrop Component
 * @param theme - Theme.
 * @returns MuiBackdrop component theme styles.
 */
export const MuiBackdrop = (theme: Theme): Components["MuiBackdrop"] => {
  return {
    styleOverrides: {
      invisible: {
        backgroundColor: "transparent",
      },
      root: {
        backgroundColor: `${theme.palette.ink.main}${alpha80}`,
      },
    },
  };
};

/**
 * MuiBreadcrumbs Component
 * @param theme - Theme.
 * @returns MuiBreadcrumbs component theme styles.
 */
export const MuiBreadcrumbs = (theme: Theme): Components["MuiBreadcrumbs"] => {
  return {
    styleOverrides: {
      li: {
        ...theme.typography[TEXT_BODY_SMALL_400],
        "& .MuiLink-root": {
          color: "inherit",
        },
      },
      ol: {
        gap: 2,
      },
      root: {
        color: theme.palette.ink.light,
      },
      separator: {
        margin: 0,
      },
    },
  };
};

/**
 * MuiButton Component
 * @param theme - Theme.
 * @returns MuiButton component theme styles.
 */
export const MuiButton = (theme: Theme): Components["MuiButton"] => {
  return {
    defaultProps: {
      disableRipple: true,
      disableTouchRipple: true,
    },
    styleOverrides: {
      endIcon: {
        margin: 0,
      },
      root: {
        ...theme.typography[TEXT_BODY_500],
        gap: 4,
        letterSpacing: "normal",
        padding: "10px 16px",
        textTransform: "capitalize",
      },
      startIcon: {
        marginRight: 0,
      },
    },
    variants: [
      {
        props: {
          variant: "nav",
        },
        style: {
          ...theme.typography[TEXT_BODY_500],
          color: theme.palette.ink.main,
          minWidth: 0,
          padding: "12px 24px",
          textTransform: "capitalize",
          whiteSpace: "nowrap",
          // eslint-disable-next-line sort-keys -- disabling key order for readability
          "&:hover": {
            backgroundColor: theme.palette.smoke.light,
          },
          [desktopSmUp]: {
            padding: "6px 12px",
          },
        },
      },
    ],
  };
};

/**
 * MuiButtonBase Component
 * @param theme - Theme.
 * @returns MuiButtonBase component theme styles.
 */
export const MuiButtonBase = (theme: Theme): Components["MuiButtonBase"] => {
  return {
    defaultProps: {
      disableRipple: true,
      disableTouchRipple: true,
    },
    styleOverrides: {
      root: {
        flex: "none",
        fontFamily: theme.typography.fontFamily,
      },
    },
  };
};

/**
 * MuiButtonGroup Component
 * @param theme - Theme.
 * @returns MuiButtonGroup component theme styles.
 */
export const MuiButtonGroup = (theme: Theme): Components["MuiButtonGroup"] => {
  return {
    defaultProps: {
      disableElevation: true,
      disableRipple: true,
    },
    styleOverrides: {
      grouped: {
        minWidth: 0,
        padding: "6px 8px",
      },
      groupedContainedPrimary: {
        borderColor: theme.palette.primary.dark,
        boxShadow: `0 1px 0 0 ${theme.palette.primary.dark}`,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          boxShadow: `0 1px 0 0 ${theme.palette.primary.dark}`,
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:active": {
          boxShadow: "none",
        },
      },
    },
  };
};

/**
 * MuiCheckbox Component
 * @param theme - Theme.
 * @returns MuiCheckbox component theme styles.
 */
export const MuiCheckbox = (theme: Theme): Components["MuiCheckbox"] => {
  return {
    defaultProps: {
      size: "xsmall",
    },
    styleOverrides: {
      root: {
        color: theme.palette.smoke.dark,
        padding: 0,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&.Mui-disabled": {
          color: theme.palette.smoke.dark,
        },
      },
    },
    variants: [
      {
        props: {
          size: "xsmall",
        },
        style: {
          fontSize: "18px",
        },
      },
    ],
  };
};

/**
 * MuiChip Component
 * @param theme - Theme.
 * @returns MuiChip component theme styles.
 */
export const MuiChip = (theme: Theme): Components["MuiChip"] => {
  return {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      deleteIcon: {
        color: "inherit",
        margin: "0 -2px 0 0",
      },
    },
    variants: [
      {
        props: { color: "default" },
        style: {
          backgroundColor: theme.palette.smoke.main,
          color: theme.palette.ink.main,
        },
      },
      {
        props: { color: "info" },
        style: {
          backgroundColor: theme.palette.info.light,
        },
      },
      {
        props: { color: "warning" },
        style: {
          backgroundColor: theme.palette.warning.light,
        },
      },
      {
        props: { variant: "filterTag" },
        style: {
          ...theme.typography[TEXT_BODY_SMALL_500],
          cursor: "pointer", // "pointer" cursor required to restore "clickable" ui
          gap: 2,
          height: 24,
          justifySelf: FLEX_START,
          padding: "0 8px",
          // eslint-disable-next-line sort-keys -- disabling key order for readability
          "& .MuiChip-label": {
            padding: 0,
          },
        },
      },
      {
        props: { variant: "ntag" },
        style: {
          ...theme.typography[TEXT_BODY_SMALL_400],
          backgroundColor: theme.palette.smoke.main,
          borderColor: white,
          borderStyle: "solid",
          borderWidth: 2,
          boxSizing: "content-box",
          height: 24,
        },
      },
      {
        props: { variant: "status" },
        style: {
          ...theme.typography[TEXT_BODY_SMALL_500],
          borderColor: white,
          borderStyle: "solid",
          borderWidth: 2,
          height: 24,
        },
      },
    ],
  };
};

/**
 * MuiCssBaseline Component
 * @param theme - Theme.
 * @returns MuiCssBaseline component theme styles.
 */
export const MuiCssBaseline = (theme: Theme): Components["MuiCssBaseline"] => {
  return {
    styleOverrides: {
      a: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          textDecoration: "underline",
        },
      },
      body: {
        fontFamily: theme.typography.fontFamily,
      },
      img: {
        display: "block",
      },
      p: {
        margin: "0 0 8px",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:last-child": {
          margin: 0,
        },
      },
      strong: {
        fontWeight: 500,
      },
    },
  };
};

/**
 * MuiDialog Component
 * @param theme - Theme.
 * @returns MuiDialog component theme styles.
 */
export const MuiDialog = (theme: Theme): Components["MuiDialog"] => {
  return {
    styleOverrides: {
      paper: {
        boxShadow: theme.shadows[2], // elevation02
      },
      root: {
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiBackdrop-root": {
          backgroundColor: `${theme.palette.ink.main}${alpha60}`,
        },
      },
    },
  };
};

/**
 * MuiDialogActions Component
 */
export const MuiDialogActions: Components["MuiDialogActions"] = {
  styleOverrides: {
    root: {
      padding: 20,
    },
  },
};

/**
 * MuiDialogContent Component
 * @param theme - Theme.
 * @returns MuiDialogContent component theme styles.
 */
export const MuiDialogContent = (
  theme: Theme
): Components["MuiDialogContent"] => {
  return {
    styleOverrides: {
      root: {
        borderColor: theme.palette.smoke.main,
        padding: 20,
      },
    },
  };
};

/**
 * MuiDialogTitle Component
 * @param theme - Theme.
 * @returns MuiDialogTitle component theme styles.
 */
export const MuiDialogTitle = (theme: Theme): Components["MuiDialogTitle"] => {
  return {
    styleOverrides: {
      root: {
        ...theme.typography[TEXT_HEADING],
        alignItems: "center",
        display: "grid",
        gridAutoFlow: "column",
        padding: 20,
        [tabletUp]: {},
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiIconButton-edgeEnd": {
          alignSelf: FLEX_START,
          justifySelf: "flex-end",
        },
      },
    },
  };
};

/**
 * MuiDivider Component
 * @param theme - Theme.
 * @returns MuiDivider component theme styles.
 */
export const MuiDivider = (theme: Theme): Components["MuiDivider"] => {
  return {
    styleOverrides: {
      root: {
        borderColor: theme.palette.smoke.main,
      },
    },
  };
};

/**
 * MuiDrawer Component
 */
export const MuiDrawer: Components["MuiDrawer"] = {
  styleOverrides: {
    paper: {
      overflowY: "visible", // required; allows backdrop button to render outside of drawer container
    },
  },
};

/**
 * MuiIconButton Component
 * @param theme - Theme.
 * @returns MuiIconButton component theme styles.
 */
export const MuiIconButton = (theme: Theme): Components["MuiIconButton"] => {
  return {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 4,
      },
      sizeLarge: {
        padding: 10,
      },
      sizeSmall: {
        padding: 6,
      },
    },
    variants: [
      {
        props: {
          color: "ink",
        },
        style: {
          color: theme.palette.ink.main,
          // eslint-disable-next-line sort-keys -- disabling key order for readability
          "&:hover": {
            backgroundColor: theme.palette.smoke.light,
          },
        },
      },
      {
        props: {
          color: "inkLight",
        },
        style: {
          color: theme.palette.ink.light,
          // eslint-disable-next-line sort-keys -- disabling key order for readability
          "&:hover": {
            backgroundColor: theme.palette.smoke.light,
          },
        },
      },
      {
        props: {
          edge: "end",
          size: "small",
        },
        style: {
          marginRight: -6,
        },
      },
      {
        props: {
          size: "xlarge",
        },
        style: {
          padding: 14,
        },
      },
      {
        props: {
          size: "xsmall",
        },
        style: {
          padding: 4,
        },
      },
      {
        props: {
          edge: "end",
          size: "xsmall",
        },
        style: {
          marginRight: -4,
        },
      },
      {
        props: {
          size: "xxsmall",
        },
        style: {
          padding: 0,
        },
      },
    ],
  };
};

/**
 * MuiInputBase Component
 * @param theme - Theme.
 * @returns MuiInputBase component theme styles.
 */
export const MuiInputBase = (theme: Theme): Components["MuiInputBase"] => {
  return {
    styleOverrides: {
      adornedStart: {
        gap: 8,
      },
      root: {
        ...theme.typography[TEXT_BODY_400],
        height: 40,
        letterSpacing: "normal",
      },
    },
  };
};

/**
 * MuiLink Component
 */
export const MuiLink: Components["MuiLink"] = {
  defaultProps: {
    underline: "hover",
  },
};

/**
 * MuiListItemButton Component
 * @param theme - Theme.
 * @returns MuiListItemButton component theme styles.
 */
export const MuiListItemButton = (
  theme: Theme
): Components["MuiListItemButton"] => {
  return {
    styleOverrides: {
      root: {
        ...theme.typography[TEXT_BODY_400],
        minHeight: "unset",
        padding: "10px 16px",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: theme.palette.smoke.light,
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&.Mui-selected": {
          backgroundColor: "unset",
          // eslint-disable-next-line sort-keys -- disabling key order for readability
          "&:hover": {
            backgroundColor: theme.palette.smoke.light,
          },
        },
      },
    },
  };
};

/**
 * MuiListItemText Component
 */
export const MuiListItemText: Components["MuiListItemText"] = {
  styleOverrides: {
    root: {
      margin: 0,
    },
  },
};

/**
 * MuiMenuItem Component
 * @param theme - Theme.
 * @returns MuiMenuItem component theme styles.
 */
export const MuiMenuItem = (theme: Theme): Components["MuiMenuItem"] => {
  return {
    defaultProps: { disableRipple: true },
    styleOverrides: {
      root: {
        ...theme.typography[TEXT_BODY_400],
        minHeight: "unset",
        padding: "10px 16px",
      },
    },
  };
};

/**
 * MuiOutlinedInput Component
 * @param theme - Theme.
 * @returns MuiOutlinedInput component theme styles.
 */
export const MuiOutlinedInput = (
  theme: Theme
): Components["MuiOutlinedInput"] => {
  return {
    styleOverrides: {
      input: {
        color: theme.palette.ink.light,
        height: 20,
        padding: "10px 14px 10px 0",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:focus": {
          color: theme.palette.ink.main,
        },
      },
      notchedOutline: {
        borderColor: theme.palette.smoke.dark,
      },
      root: {
        backgroundColor: white,
        boxShadow: `inset 0 2px 0 0 ${black04}`,
        paddingLeft: 12,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiSvgIcon-root": {
          color: theme.palette.ink.light, // Adornment e.g. "SearchIcon".
        },
        "&:hover": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.smoke.dark,
          },
        },
        // eslint-disable-next-line sort-keys -- disabling key order for specificity
        "&.Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.ink.main,
            borderWidth: 1,
          },
          "& .MuiSvgIcon-root": {
            color: theme.palette.ink.main, // Adornment e.g. "SearchIcon".
          },
        },
      },
    },
  };
};

/**
 * MuiPaper Component
 * @param theme - Theme.
 * @returns MuiPaper component theme styles.
 */
export const MuiPaper = (theme: Theme): Components["MuiPaper"] => {
  return {
    variants: [
      {
        props: { variant: "footer" },
        style: {
          backgroundColor: theme.palette.smoke.light,
          boxShadow: `${strokeTop} ${theme.palette.smoke.main}, ${strokeBottom} ${theme.palette.smoke.main}`,
        },
      },
      {
        props: { variant: "menu" },
        style: {
          borderColor: theme.palette.smoke.dark,
          borderRadius: 8,
          borderStyle: "solid",
          borderWidth: 1,
          boxShadow: theme.shadows[2], // elevation02
        },
      },
      {
        props: { variant: "panel" },
        style: {
          borderColor: theme.palette.smoke.main,
          borderStyle: "solid",
          borderWidth: 1,
          boxShadow: theme.shadows[1], // elevation01
        },
      },
      {
        props: { variant: "searchbar" },
        style: {
          alignSelf: "flex-start",
          borderColor: theme.palette.smoke.main,
          borderRadius: 0,
          borderStyle: "solid",
          borderWidth: "0 0 1px 0",
          boxShadow: theme.shadows[1], // elevation01,
          // eslint-disable-next-line sort-keys -- disabling key order for readability
          "&.MuiDialog-paper": {
            marginLeft: 0,
            marginRight: 0,
            width: "100%",
          },
        },
      },
      {
        props: { variant: "sidebar" },
        style: {
          backgroundColor: theme.palette.smoke.light,
          padding: "24px 0",
          width: 312,
        },
      },
    ],
  };
};

/**
 * MuiSvgIcon Component
 * @param theme - Theme.
 * @returns MuiSvgIcon component theme styles.
 */
export const MuiSvgIcon = (theme: Theme): Components["MuiSvgIcon"] => {
  return {
    styleOverrides: {
      fontSizeLarge: {
        fontSize: "32px",
      },
      fontSizeSmall: {
        fontSize: "20px",
      },
    },
    variants: [
      {
        props: {
          color: "inkLight",
        },
        style: {
          color: theme.palette.ink.light,
        },
      },
      {
        props: {
          fontSize: "medium",
        },
        style: {
          fontSize: "24px",
        },
      },
      {
        props: {
          fontSize: "xsmall",
        },
        style: {
          fontSize: "18px",
        },
      },
      {
        props: {
          fontSize: "xxlarge",
        },
        style: {
          fontSize: "40px",
        },
      },
      {
        props: {
          fontSize: "xxsmall",
        },
        style: {
          fontSize: "16px",
        },
      },
    ],
  };
};

/**
 * MuiTab Component
 * @param theme - Theme.
 * @returns MuiTab component theme styles.
 */
export const MuiTab = (theme: Theme): Components["MuiTab"] => {
  return {
    styleOverrides: {
      labelIcon: {
        gap: 8,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& > img": {
          maxHeight: 20, // Tab image max height.
        },
      },
      root: {
        ...theme.typography[TEXT_BODY_500],
        color: theme.palette.ink.light,
        marginBottom: 3,
        minHeight: "unset",
        minWidth: "unset",
        opacity: 1,
        padding: 12,
        textTransform: "capitalize",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& > .MuiTab-iconWrapper": {
          marginRight: 0,
        },
        "&.Mui-selected": {
          color: theme.palette.ink.main,
        },
      },
    },
  };
};

/**
 * MuiTableCell Component
 * @param theme - Theme.
 * @returns MuiTableCell component theme styles.
 */
export const MuiTableCell = (theme: Theme): Components["MuiTableCell"] => {
  return {
    styleOverrides: {
      body: {
        ...theme.typography[TEXT_BODY_400],
      },
      head: {
        ...theme.typography[TEXT_BODY_SMALL_500],
        padding: "20px",
      },
      root: {
        padding: "18px 20px",
      },
      sizeSmall: {
        padding: "14px 20px",
      },
      stickyHeader: {
        boxShadow: `0 1px 0 ${theme.palette.smoke.main}`,
      },
    },
  };
};

/**
 * MuiTableSortLabel Component
 */
export const MuiTableSortLabel: Components["MuiTableSortLabel"] = {
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

/**
 * MuiTabs Component
 * @param theme - Theme.
 * @returns MuiTabs component theme styles.
 */
export const MuiTabs = (theme: Theme): Components["MuiTabs"] => {
  return {
    defaultProps: {
      textColor: "inherit",
      variant: "scrollable",
    },
    styleOverrides: {
      flexContainer: {
        gap: 8,
      },
      indicator: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        height: 3,
      },
      root: {
        boxShadow: `${strokeBottom} ${theme.palette.smoke.main}`,
        minHeight: "unset",
        position: "relative", // Positions scroll fuzz.
      },
      scroller: {
        margin: "0 16px",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        [tabletUp]: {
          margin: 0,
        },
      },
    },
  };
};

/**
 * MuiToggleButton Component
 * @param theme - Theme.
 * @returns MuiToggleButton component theme styles.
 */
export const MuiToggleButton = (
  theme: Theme
): Components["MuiToggleButton"] => {
  return {
    styleOverrides: {
      root: {
        ...theme.typography[TEXT_BODY_500],
        backgroundColor: theme.palette.smoke.main,
        border: "none",
        borderRadius: 4,
        color: theme.palette.ink.main,
        flex: 1,
        padding: "8px 12px",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: theme.palette.smoke.lightest,
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&.Mui-selected": {
          backgroundColor: white,
          // eslint-disable-next-line sort-keys -- disabling key order for readability
          "&:hover": {
            backgroundColor: white,
          },
        },
      },
    },
  };
};

/**
 * MuiToggleButtonGroup Component
 * @param theme - Theme.
 * @returns MuiToggleButtonGroup component theme styles.
 */
export const MuiToggleButtonGroup = (
  theme: Theme
): Components["MuiToggleButtonGroup"] => {
  return {
    styleOverrides: {
      grouped: {
        border: "none !important", // Overrides "grouped" css selector specificity.
        borderRadius: "4px !important", // Overrides "grouped" css selector specificity.
        margin: "0 !important", // Overrides "grouped" css selector specificity.
      },
      root: {
        backgroundColor: theme.palette.smoke.main,
        borderRadius: 6,
        color: theme.palette.ink.main,
        display: "grid",
        gridAutoColumns: "1fr",
        gridAutoFlow: "column",
        padding: 2,
      },
    },
  };
};

/**
 * MuiToolbar Component
 */
export const MuiToolbar: Components["MuiToolbar"] = {
  styleOverrides: {
    root: {
      [mobileUp]: {
        paddingLeft: 12,
        paddingRight: 12,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      [desktopUp]: {
        paddingLeft: 16,
        paddingRight: 16,
      },
    },
  },
};

/**
 * MuiTooltip Component
 * @param theme - Theme.
 * @returns MuiTooltip component theme styles.
 */
export const MuiTooltip = (theme: Theme): Components["MuiTooltip"] => {
  return {
    styleOverrides: {
      arrow: {
        color: theme.palette.ink.main,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:before": {
          borderRadius: 1,
        },
      },
      tooltip: {
        ...theme.typography[TEXT_BODY_SMALL_400],
        backgroundColor: theme.palette.ink.main,
        boxShadow: theme.shadows[2], // elevation02
        padding: "8px 12px",
      },
    },
  };
};

/**
 * MuiTypography Component
 */
export const MuiTypography: Components["MuiTypography"] = {
  defaultProps: {
    variant: "inherit",
  },
  styleOverrides: {
    gutterBottom: {
      marginBottom: 8,
    },
  },
};

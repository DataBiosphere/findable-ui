import { Components, Theme } from "@mui/material";
import { DropDownIcon } from "../../components/common/Form/components/Select/components/DropDownIcon/dropDownIcon";
import { CHIP_PROPS } from "../../styles/common/mui/chip";
import { desktopUp, mobileUp, tabletUp } from "./breakpoints";
import {
  alpha32,
  alpha60,
  alpha64,
  alpha80,
  black04,
  black08,
  white,
} from "./palette";
import { strokeBottom, strokeTop } from "./shadows";
import {
  TEXT_BODY_400,
  TEXT_BODY_400_2_LINES,
  TEXT_BODY_500,
  TEXT_BODY_SMALL_400,
  TEXT_BODY_SMALL_500,
  TEXT_HEADING,
  TEXT_HEADING_SMALL,
} from "./typography";

// Constants
const FLEX_START = "flex-start";

/**
 * MuiAccordion Component
 * @param theme - Theme.
 * @returns MuiAccordion component theme styles.
 */
export const MuiAccordion = (theme: Theme): Components["MuiAccordion"] => {
  return {
    defaultProps: {
      disableGutters: true,
      elevation: 0,
      square: true,
    },
    styleOverrides: {
      root: {
        backgroundColor: "transparent",
        boxShadow: `${strokeTop} ${theme.palette.smoke.main}, ${strokeBottom} ${theme.palette.smoke.main}`,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:before": {
          display: "none",
        },
        "&:nth-of-type(n+2)": {
          boxShadow: `${strokeBottom} ${theme.palette.smoke.main}`,
        },
      },
    },
  };
};

/**
 * MuiAccordionDetails Component
 */
export const MuiAccordionDetails: Components["MuiAccordionDetails"] = {
  styleOverrides: {
    root: {
      marginBottom: 16,
      padding: "0 32px",
    },
  },
};

/**
 * MuiAccordionSummary Component
 */
export const MuiAccordionSummary: Components["MuiAccordionSummary"] = {
  styleOverrides: {
    content: {
      margin: "16px 0",
    },
    root: {
      flexDirection: "row-reverse",
      gap: 8,
      padding: 0,
    },
  },
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
        margin: 0,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& .MuiLink-root": {
          color: "inherit",
        },
        "& .MuiTypography-root": {
          color: "inherit",
          font: "inherit",
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
      containedPrimary: {
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0 1px 0 0 ${theme.palette.primary.dark}`,
        color: theme.palette.common.white,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
          boxShadow: `0 1px 0 0 ${theme.palette.primary.dark}`,
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:active": {
          backgroundColor: theme.palette.primary.dark,
          boxShadow: "none",
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&.Mui-disabled": {
          backgroundColor: theme.palette.primary.main,
          boxShadow: `0 1px 0 0 ${theme.palette.primary.dark}`,
          color: theme.palette.common.white,
          opacity: 0.5,
        },
      },
      containedSecondary: {
        backgroundColor: theme.palette.common.white,
        boxShadow: `inset 0 0 0 1px ${theme.palette.smoke.dark}, 0 1px 0 0 ${black08}`,
        color: theme.palette.ink.main,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&.Mui-focusVisible": {
          backgroundColor: theme.palette.common.white,
          boxShadow: `inset 0 0 0 1px ${theme.palette.smoke.dark}, 0 1px 0 0 ${black08}`,
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: theme.palette.smoke.lightest,
          boxShadow: `inset 0 0 0 1px ${theme.palette.smoke.dark}, 0 1px 0 0 ${black08}`,
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:active": {
          backgroundColor: theme.palette.smoke.lightest,
          boxShadow: `inset 0 0 0 1px ${theme.palette.smoke.dark}`,
        },
        "&:disabled": {
          backgroundColor: theme.palette.common.white,
          boxShadow: `inset 0 0 0 1px ${theme.palette.smoke.dark}, 0 1px 0 0 ${black08}`,
          color: theme.palette.ink.main,
          opacity: 0.5,
        },
      },
      endIcon: {
        margin: 0,
      },
      outlinedSecondary: {
        backgroundColor: "transparent",
        border: "none",
        boxShadow: `inset 0 0 0 1px ${theme.palette.ink.main}${alpha32}`,
        color: theme.palette.ink.main,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: "transparent",
          border: "none",
          boxShadow: `inset 0 0 0 1px ${theme.palette.ink.main}${alpha64}`,
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:disabled": {
          backgroundColor: "transparent",
          border: "none",
          boxShadow: `inset 0 0 0 1px ${theme.palette.ink.main}${alpha32}`,
          color: theme.palette.ink.main,
          opacity: 0.5,
        },
      },
      root: {
        ...theme.typography[TEXT_BODY_500],
        gap: 4,
        letterSpacing: "normal",
        padding: "10px 16px",
        textTransform: "capitalize",
      },
      sizeSmall: {
        padding: "6px 12px",
      },
      startIcon: {
        marginRight: 0,
      },
      text: {
        alignSelf: "center",
        minWidth: 0,
        padding: 0,
      },
      textPrimary: {
        color: theme.palette.primary.main,
      },
    },
    variants: [
      {
        props: {
          variant: "activeNav", // associated with "nav" variant.
        },
        style: {
          ...theme.typography[TEXT_BODY_500],
          backgroundColor: theme.palette.smoke.light,
          color: theme.palette.ink.main,
          minWidth: 0,
          textTransform: "capitalize",
          whiteSpace: "nowrap",
          // eslint-disable-next-line sort-keys -- disabling key order for readability
          "&:hover": {
            backgroundColor: theme.palette.smoke.light,
          },
        },
      },
      {
        props: {
          variant: "backNav", // associated with "nav" variant.
        },
        style: {
          ...theme.typography[TEXT_HEADING_SMALL],
          color: theme.palette.ink.main,
          minWidth: 0,
          textTransform: "capitalize",
          whiteSpace: "nowrap",
          // eslint-disable-next-line sort-keys -- disabling key order for readability
          "&:hover": {
            backgroundColor: theme.palette.smoke.light,
          },
        },
      },
      {
        props: {
          variant: "nav",
        },
        style: {
          ...theme.typography[TEXT_BODY_500],
          color: theme.palette.ink.main,
          minWidth: 0,
          textTransform: "capitalize",
          whiteSpace: "nowrap",
          // eslint-disable-next-line sort-keys -- disabling key order for readability
          "&:hover": {
            backgroundColor: theme.palette.smoke.light,
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
 * MuiCard Component
 */
export const MuiCard: Components["MuiCard"] = {
  styleOverrides: {
    root: {
      borderRadius: 8,
    },
  },
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
      label: {
        ...theme.typography[TEXT_BODY_SMALL_400],
      },
    },
    variants: [
      {
        props: { size: CHIP_PROPS.SIZE.SMALL },
        style: {
          height: 20,
        },
      },
      {
        props: { size: CHIP_PROPS.SIZE.MEDIUM },
        style: {
          height: 24,
        },
      },
      {
        props: { color: "default" },
        style: {
          backgroundColor: theme.palette.smoke.main,
          color: theme.palette.ink.main,
        },
      },
      {
        props: { color: "error" },
        style: {
          backgroundColor: theme.palette.alert.light,
          color: theme.palette.alert.main,
        },
      },
      {
        props: { color: "info" },
        style: {
          backgroundColor: theme.palette.info.light,
          color: theme.palette.info.main,
        },
      },
      {
        props: { color: "success" },
        style: {
          backgroundColor: theme.palette.success.light,
          color: theme.palette.success.main,
        },
      },
      {
        props: { color: "warning" },
        style: {
          backgroundColor: theme.palette.warning.light,
          color: theme.palette.warning.main,
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
          boxShadow: `0 0 0 2px ${white}`,
          height: 24,
          justifySelf: FLEX_START,
          minWidth: 0,
        },
      },
      {
        props: { variant: "status" },
        style: {
          ...theme.typography[TEXT_BODY_SMALL_500],
          boxShadow: `0 0 0 2px ${white}`,
          height: 20,
          maxWidth: "fit-content",
          minWidth: 0,
        },
      },
    ],
  };
};

/**
 * MuiCircularProgress Component
 * @param theme - Theme.
 * @returns MuiCircularProgress component theme styles.
 */
export const MuiCircularProgress = (
  theme: Theme
): Components["MuiCircularProgress"] => {
  return {
    styleOverrides: {
      circle: {
        strokeLinecap: "round",
      },
    },
    variants: [
      {
        props: {
          color: "alert",
        },
        style: {
          color: theme.palette.alert.main,
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
      code: {
        ...theme.typography[TEXT_BODY_400_2_LINES],
        fontFamily: "Roboto Mono, monospace",
        fontSize: 12,
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
      pre: {
        margin: 0,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
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
 * MuiFormControlLabel Component
 * @param theme - Theme.
 * @returns MuiFormControlLabel component theme styles.
 */
export const MuiFormControlLabel = (
  theme: Theme
): Components["MuiFormControlLabel"] => {
  return {
    styleOverrides: {
      label: {
        ...theme.typography[TEXT_BODY_400],
      },
      root: {
        gap: 8,
        margin: 0,
      },
    },
  };
};

/**
 * MuiFormGroup Component
 */
export const MuiFormGroup: Components["MuiFormGroup"] = {
  styleOverrides: {
    root: {
      alignItems: FLEX_START,
      gap: 12,
    },
  },
};

/**
 * MuiFormHelperText Component
 * @param theme - Theme.
 * @returns MuiFormHelperText component theme styles.
 */
export const MuiFormHelperText = (
  theme: Theme
): Components["MuiFormHelperText"] => {
  return {
    styleOverrides: {
      root: {
        ...theme.typography[TEXT_BODY_SMALL_400],
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&.Mui-error": {
          color: theme.palette.alert.main,
        },
      },
    },
  };
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
      colorPrimary: {
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0 1px 0 0 ${theme.palette.primary.dark}`,
        color: theme.palette.common.white,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&.Mui-disabled": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          opacity: 0.5,
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:active": {
          backgroundColor: theme.palette.primary.dark,
          boxShadow: "none",
        },
      },
      colorSecondary: {
        backgroundColor: theme.palette.common.white,
        boxShadow: `inset 0 0 0 1px ${theme.palette.smoke.dark}, 0 1px 0 0 ${black08}`,
        color: theme.palette.ink.main,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&.Mui-disabled": {
          color: "inherit",
          opacity: 0.5,
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: theme.palette.smoke.lightest,
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:active": {
          backgroundColor: theme.palette.smoke.lightest,
          boxShadow: `inset 0 0 0 1px ${theme.palette.smoke.dark}`,
        },
      },
      root: {
        borderRadius: 4,
      },
      sizeLarge: {
        padding: 10,
      },
      sizeMedium: {
        padding: "6px 8px",
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
      multiline: {
        height: "unset",
      },
      root: {
        ...theme.typography[TEXT_BODY_400],
        fontSize: 16, // overrides default 14px to prevent IOS zoom on focus.
        height: 40,
        letterSpacing: "normal",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        [tabletUp]: {
          fontSize: theme.typography[TEXT_BODY_400].fontSize,
        },
      },
    },
  };
};

/**
 * MuiLink Component
 */
export const MuiLink: Components["MuiLink"] = {
  defaultProps: {
    underline: "always",
  },
  styleOverrides: {
    root: {
      cursor: "pointer",
      textDecorationColor: "currentColor",
      textDecorationSkipInk: "none",
      textUnderlinePosition: "from-font",
    },
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
 * MuiListSubheader Component
 * @param theme - Theme.
 * @returns MuiListSubheader component theme styles.
 */
export const MuiListSubheader = (
  theme: Theme
): Components["MuiListSubheader"] => {
  return {
    defaultProps: { disableSticky: true },
    styleOverrides: {
      root: {
        ...theme.typography[TEXT_BODY_500],
        color: theme.palette.ink.main,
      },
    },
  };
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
        // eslint-disable-next-line sort-keys -- disabling key order for specificity
        "&.Mui-disabled": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.smoke.dark,
            borderWidth: 1,
          },
          "& .MuiSvgIcon-root": {
            color: theme.palette.ink.light,
          },
        },
        "&.Mui-error": {
          backgroundColor: theme.palette.alert.lightest,
          // eslint-disable-next-line sort-keys -- disabling key order for specificity
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.alert.main,
            borderWidth: 1,
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
        props: { elevation: 1 },
        style: {
          boxShadow: theme.shadows[1], // elevation01
        },
      },
      {
        props: { elevation: 2 },
        style: {
          boxShadow: theme.shadows[2], // elevation02
        },
      },
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
          alignSelf: FLEX_START,
          borderColor: theme.palette.smoke.main,
          borderRadius: 0,
          borderStyle: "solid",
          borderWidth: "0 0 1px 0",
          boxShadow: theme.shadows[1], // elevation01,
          // eslint-disable-next-line sort-keys -- disabling key order for readability
          "&.MuiDialog-paper": {
            marginLeft: 0,
            marginRight: 0,
            maxWidth: "100%",
            width: "100%",
          },
        },
      },
      {
        props: { variant: "table" }, // Copy of "panel" variant.
        style: {
          borderColor: theme.palette.smoke.main,
          borderStyle: "solid",
          borderWidth: 1,
          boxShadow: theme.shadows[1], // elevation01
        },
      },
    ],
  };
};

/**
 * MuiRadio Component
 * @param theme - Theme.
 * @returns MuiRadio component theme styles.
 */
export const MuiRadio = (theme: Theme): Components["MuiRadio"] => {
  return {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        color: theme.palette.smoke.dark,
        padding: 0,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&.Mui-disabled": {
          color: theme.palette.smoke.dark,
          opacity: "50%",
        },
        "&.MuiRadio-colorDefault": {
          color: theme.palette.ink.light,
          // eslint-disable-next-line sort-keys -- disabling key order for readability
          "&.Mui-disabled": {
            color: theme.palette.smoke.main,
            opacity: "100%",
          },
        },
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
    },
  };
};

/**
 * MuiSelect Component
 */
export const MuiSelect: Components["MuiSelect"] = {
  defaultProps: {
    IconComponent: DropDownIcon,
  },
  styleOverrides: {
    select: {
      minHeight: "unset",
      paddingRight: "36px !important", // Overrides MuiSelect css selector specificity.
    },
  },
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
      root: {
        "&.MuiSelect-icon": {
          color: theme.palette.ink.main,
          right: 8,
        },
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
          color: "inkMain",
        },
        style: {
          color: theme.palette.ink.main,
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
        "&.Mui-selected": {
          color: theme.palette.ink.main,
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "& > .MuiTab-iconWrapper": {
          marginRight: 0,
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
      paddingCheckbox: {
        paddingRight: 0,
        width: "unset",
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
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:not(.MuiTabs-flexContainerVertical)": {
          // eslint-disable-next-line sort-keys -- disabling key order for readability
          ".MuiTab-root": {
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "&:hover": {
              color: theme.palette.ink.main,
              overflow: "visible",
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "&:after": {
                backgroundColor: theme.palette.smoke.dark,
                borderRadius: "12px 12px 0 0",
                bottom: -3,
                content: '""',
                height: 3,
                left: 0,
                position: "absolute",
                width: "100%",
              },
            },
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "&.Mui-selected": {
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "&:hover": {
                overflow: "unset",
                // eslint-disable-next-line sort-keys -- disabling key order for readability
                "&:after": {
                  content: "none",
                },
              },
            },
          },
        },
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
        margin: 0,
        padding: "0 8px",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        [tabletUp]: {
          padding: 0,
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
    defaultProps: {
      enterTouchDelay: 0,
      leaveTouchDelay: 4000,
      placement: "top",
    },
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
        boxSizing: "content-box",
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

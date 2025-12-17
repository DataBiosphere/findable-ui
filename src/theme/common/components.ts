import { Components, Theme, ThemeOptions } from "@mui/material";
import { DropDownIcon } from "../../components/common/Form/components/Select/components/DropDownIcon/dropDownIcon";
import { APP } from "../../styles/common/constants/app";
import { COLOR_MIXES } from "../../styles/common/constants/colorMixes";
import { FONT } from "../../styles/common/constants/font";
import { PALETTE } from "../../styles/common/constants/palette";
import { SHADOWS } from "../../styles/common/constants/shadows";
import { bpUpLg, bpUpSm, bpUpXs } from "../../styles/common/mixins/breakpoints";
import { BUTTON_PROPS } from "../../styles/common/mui/button";
import { CHIP_PROPS } from "../../styles/common/mui/chip";
import { OUTLINED_INPUT_PROPS } from "../../styles/common/mui/outlinedInput";
import { TOGGLE_BUTTON_PROPS } from "../../styles/common/mui/toggleButton";
import { TYPOGRAPHY_PROPS } from "../../styles/common/mui/typography";
import * as C from "../components";

// Constants
const FLEX_START = "flex-start";

const MuiAccordion: Components["MuiAccordion"] = {
  defaultProps: {
    disableGutters: true,
    elevation: 0,
    square: true,
  },
  styleOverrides: {
    root: {
      backgroundColor: "transparent",
      boxShadow: `inset 0 1px 0 0 ${PALETTE.SMOKE_MAIN}, inset 0 -1px 0 0 ${PALETTE.SMOKE_MAIN}`,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:before": {
        display: "none",
      },
      "&:nth-of-type(n+2)": {
        boxShadow: `inset 0 -1px 0 0 ${PALETTE.SMOKE_MAIN}`,
      },
    },
  },
};

const MuiAccordionDetails: Components["MuiAccordionDetails"] = {
  styleOverrides: {
    root: {
      marginBottom: 16,
      padding: "0 32px",
    },
  },
};

const MuiAccordionSummary: Components["MuiAccordionSummary"] = {
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

const MuiAppBar: Components["MuiAppBar"] = {
  defaultProps: {
    color: "default",
    elevation: 0,
    position: "static",
  },
  styleOverrides: {
    colorDefault: {
      backgroundColor: PALETTE.COMMON_WHITE,
    },
  },
};

const MuiBackdrop: Components["MuiBackdrop"] = {
  styleOverrides: {
    invisible: {
      backgroundColor: "transparent",
    },
    root: {
      backgroundColor: COLOR_MIXES.INK_MAIN_80,
    },
  },
};

const MuiBreadcrumbs: Components["MuiBreadcrumbs"] = {
  styleOverrides: {
    li: {
      font: FONT.BODY_SMALL_400,
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
      color: PALETTE.INK_LIGHT,
    },
    separator: {
      margin: 0,
    },
  },
};

const MuiButton: Components<Theme>["MuiButton"] = {
  defaultProps: {
    disableRipple: true,
    disableTouchRipple: true,
  },
  styleOverrides: {
    containedPrimary: {
      backgroundColor: PALETTE.PRIMARY_MAIN,
      boxShadow: `0 1px 0 0 ${COLOR_MIXES.COMMON_BLACK_08}, inset 0 -1px 0 0 ${COLOR_MIXES.COMMON_BLACK_20}`,
      color: PALETTE.COMMON_WHITE,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:hover": {
        backgroundColor: PALETTE.PRIMARY_DARK,
        boxShadow: `0 1px 0 0 ${COLOR_MIXES.COMMON_BLACK_08}, inset 0 -1px 0 0 ${COLOR_MIXES.COMMON_BLACK_20}`,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:active": {
        backgroundColor: PALETTE.PRIMARY_DARK,
        boxShadow: `0 1px 0 0 ${COLOR_MIXES.COMMON_BLACK_08}, inset 0 -1px 0 0 ${COLOR_MIXES.COMMON_BLACK_20}`,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-disabled": {
        backgroundColor: PALETTE.PRIMARY_MAIN,
        boxShadow: "none",
        color: PALETTE.COMMON_WHITE,
        opacity: 0.5,
      },
    },
    containedSecondary: {
      backgroundColor: PALETTE.COMMON_WHITE,
      boxShadow: `inset 0 0 0 1px ${PALETTE.SMOKE_DARK}, 0 1px 0 0 ${COLOR_MIXES.COMMON_BLACK_05}`,
      color: PALETTE.INK_MAIN,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-focusVisible": {
        backgroundColor: PALETTE.COMMON_WHITE,
        boxShadow: `inset 0 0 0 1px ${PALETTE.SMOKE_DARK}, 0 1px 0 0 ${COLOR_MIXES.COMMON_BLACK_05}`,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:hover": {
        backgroundColor: PALETTE.SMOKE_LIGHTEST,
        boxShadow: `inset 0 0 0 1px ${PALETTE.SMOKE_DARK}, 0 1px 0 0 ${COLOR_MIXES.COMMON_BLACK_05}`,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:active": {
        backgroundColor: PALETTE.SMOKE_LIGHTEST,
        boxShadow: `inset 0 0 0 1px ${PALETTE.SMOKE_DARK}, 0 1px 0 0 ${COLOR_MIXES.COMMON_BLACK_05}`,
      },
      "&:disabled": {
        backgroundColor: PALETTE.COMMON_WHITE,
        boxShadow: `inset 0 0 0 1px ${PALETTE.SMOKE_DARK}`,
        color: PALETTE.INK_MAIN,
        opacity: 0.5,
      },
    },
    endIcon: {
      margin: 0,
      variants: [
        {
          props: { size: BUTTON_PROPS.SIZE.LARGE },
          style: { marginRight: -4 },
        },
        {
          props: { size: BUTTON_PROPS.SIZE.MEDIUM },
          style: { marginRight: -4 },
        },
      ],
    },
    outlinedSecondary: {
      backgroundColor: "transparent",
      border: "none",
      boxShadow: `inset 0 0 0 1px ${COLOR_MIXES.INK_MAIN_32}`,
      color: PALETTE.INK_MAIN,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:hover": {
        backgroundColor: "transparent",
        border: "none",
        boxShadow: `inset 0 0 0 1px ${COLOR_MIXES.INK_MAIN_64}`,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:disabled": {
        backgroundColor: "transparent",
        border: "none",
        boxShadow: `inset 0 0 0 1px ${COLOR_MIXES.INK_MAIN_32}`,
        color: PALETTE.INK_MAIN,
        opacity: 0.5,
      },
    },
    root: {
      font: FONT.BODY_500,
      gap: 4,
      letterSpacing: "normal",
      padding: "10px 16px",
      textTransform: "capitalize",
    },
    startIcon: {
      margin: 0,
      variants: [
        {
          props: { size: BUTTON_PROPS.SIZE.LARGE },
          style: { marginLeft: -4 },
        },
        {
          props: { size: BUTTON_PROPS.SIZE.MEDIUM },
          style: { marginLeft: -4 },
        },
      ],
    },
  },
  variants: [
    {
      props: { size: BUTTON_PROPS.SIZE.LARGE },
      style: {
        padding: "10px 16px",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        ".MuiButton-iconSizeLarge": {
          // eslint-disable-next-line sort-keys -- disabling key order for readability
          ".MuiSvgIcon-root": {
            fontSize: "20px",
          },
        },
      },
    },
    {
      props: { size: BUTTON_PROPS.SIZE.MEDIUM },
      style: { padding: "8px 16px" },
    },
    {
      props: {
        color: BUTTON_PROPS.COLOR.SECONDARY,
        variant: BUTTON_PROPS.VARIANT.TEXT,
      },
      style: {
        alignSelf: "center",
        color: PALETTE.INK_LIGHT,
        minWidth: 0,
        padding: 0,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: "transparent",
          textDecoration: "underline",
          textDecorationColor: "currentColor",
          textDecorationSkipInk: "none",
          textUnderlinePosition: "from-font",
        },
      },
    },
    {
      props: {
        color: BUTTON_PROPS.COLOR.PRIMARY,
        variant: BUTTON_PROPS.VARIANT.TEXT,
      },
      style: {
        alignSelf: "center",
        color: PALETTE.PRIMARY_MAIN,
        minWidth: 0,
        padding: 0,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: "transparent",
          textDecoration: "underline",
          textDecorationColor: "currentColor",
          textDecorationSkipInk: "none",
          textUnderlinePosition: "from-font",
        },
      },
    },
    {
      props: {
        variant: "activeNav", // associated with "nav" variant.
      },
      style: {
        backgroundColor: PALETTE.SMOKE_LIGHT,
        color: PALETTE.INK_MAIN,
        font: FONT.BODY_500,
        minWidth: 0,
        textTransform: "capitalize",
        whiteSpace: "nowrap",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: PALETTE.SMOKE_LIGHT,
        },
      },
    },
    {
      props: {
        variant: "backNav", // associated with "nav" variant.
      },
      style: ({ theme }) => ({
        ...theme.typography["heading-small"],
        color: PALETTE.INK_MAIN,
        minWidth: 0,
        textTransform: "capitalize",
        whiteSpace: "nowrap",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: PALETTE.SMOKE_LIGHT,
        },
      }),
    },
    {
      props: {
        variant: "nav",
      },
      style: {
        color: PALETTE.INK_MAIN,
        font: FONT.BODY_500,
        minWidth: 0,
        textTransform: "capitalize",
        whiteSpace: "nowrap",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: PALETTE.SMOKE_LIGHT,
        },
      },
    },
  ],
};

const MuiButtonBase: Components["MuiButtonBase"] = {
  defaultProps: {
    disableRipple: true,
    disableTouchRipple: true,
  },
  styleOverrides: {
    root: {
      flex: "none",
      fontFamily: APP.FONT_FAMILY,
    },
  },
};

const MuiCard: Components["MuiCard"] = {
  styleOverrides: {
    root: {
      borderRadius: 8,
    },
  },
};

const MuiCheckbox: Components["MuiCheckbox"] = {
  defaultProps: {
    size: "xsmall",
  },
  styleOverrides: {
    root: {
      color: PALETTE.SMOKE_DARK,
      padding: 0,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-disabled": {
        color: PALETTE.SMOKE_DARK,
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

const MuiChip: Components["MuiChip"] = {
  defaultProps: {
    size: "small",
  },
  styleOverrides: {
    deleteIcon: {
      color: "inherit",
      margin: "0 -2px 0 0",
    },
    label: {
      font: FONT.BODY_SMALL_400,
      variants: [
        {
          props: { variant: "status" },
          style: {
            font: FONT.BODY_SMALL_500,
          },
        },
      ],
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
        backgroundColor: PALETTE.SMOKE_MAIN,
        color: PALETTE.INK_MAIN,
      },
    },
    {
      props: { color: "error" },
      style: {
        backgroundColor: PALETTE.ALERT_LIGHT,
        color: PALETTE.ALERT_MAIN,
      },
    },
    {
      props: { color: "info" },
      style: {
        backgroundColor: PALETTE.INFO_LIGHT,
        color: PALETTE.INFO_MAIN,
      },
    },
    {
      props: {
        color: CHIP_PROPS.COLOR.PRIMARY,
        variant: CHIP_PROPS.VARIANT.FILLED,
      },
      style: {
        backgroundColor: PALETTE.PRIMARY_MAIN,
        color: PALETTE.COMMON_WHITE,
      },
    },
    {
      props: { color: "success" },
      style: {
        backgroundColor: PALETTE.SUCCESS_LIGHT,
        color: PALETTE.SUCCESS_MAIN,
      },
    },
    {
      props: { color: "warning" },
      style: {
        backgroundColor: PALETTE.WARNING_LIGHT,
        color: PALETTE.WARNING_MAIN,
      },
    },
    {
      props: { variant: "filterTag" },
      style: {
        cursor: "pointer", // "pointer" cursor required to restore "clickable" ui
        font: FONT.BODY_SMALL_500,
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
        backgroundColor: PALETTE.SMOKE_MAIN,
        boxShadow: `0 0 0 2px ${PALETTE.COMMON_WHITE}`,
        font: FONT.BODY_SMALL_400,
        height: 24,
        justifySelf: FLEX_START,
        minWidth: 0,
      },
    },
    {
      props: { variant: "status" },
      style: {
        boxShadow: `0 0 0 2px ${PALETTE.COMMON_WHITE}`,
        height: 20,
        maxWidth: "fit-content",
        minWidth: 0,
      },
    },
    {
      props: { color: "default", variant: "status" },
      style: {
        color: PALETTE.INK_LIGHT,
      },
    },
  ],
};

const MuiCircularProgress: Components["MuiCircularProgress"] = {
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
        color: PALETTE.ALERT_MAIN,
      },
    },
  ],
};

const MuiCssBaseline: Components["MuiCssBaseline"] = {
  styleOverrides: {
    a: {
      color: PALETTE.PRIMARY_MAIN,
      textDecoration: "none",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:hover": {
        textDecoration: "underline",
      },
    },
    body: {
      fontFamily: APP.FONT_FAMILY,
    },
    code: {
      font: FONT.BODY_400_2_LINES,
      fontFamily: "Roboto Mono, monospace",
      fontSize: 12,
    },
    html: {
      overscrollBehaviorX: "contain",
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

const MuiDialog: Components["MuiDialog"] = {
  styleOverrides: {
    paper: {
      boxShadow: SHADOWS["02"],
    },
    root: {
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "& .MuiBackdrop-root": {
        backgroundColor: COLOR_MIXES.INK_MAIN_60,
      },
    },
  },
};

const MuiDialogActions: Components["MuiDialogActions"] = {
  styleOverrides: {
    root: {
      padding: 20,
    },
  },
};

const MuiDialogContent: Components["MuiDialogContent"] = {
  styleOverrides: {
    root: {
      borderColor: PALETTE.SMOKE_MAIN,
      padding: 20,
    },
  },
};

const MuiDialogTitle: Components<Theme>["MuiDialogTitle"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.heading,
      alignItems: "center",
      display: "grid",
      gridAutoFlow: "column",
      padding: 20,
      [bpUpSm({ theme })]: {},
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "& .MuiIconButton-edgeEnd": {
        alignSelf: FLEX_START,
        justifySelf: "flex-end",
      },
    }),
  },
};

const MuiDivider: Components["MuiDivider"] = {
  styleOverrides: {
    root: {
      borderColor: PALETTE.SMOKE_MAIN,
    },
  },
};

const MuiDrawer: Components["MuiDrawer"] = {
  styleOverrides: {
    paper: {
      overflowY: "visible", // required; allows backdrop button to render outside of drawer container
    },
  },
};

const MuiFormControlLabel: Components["MuiFormControlLabel"] = {
  styleOverrides: {
    label: {
      font: FONT.BODY_400,
    },
    root: {
      gap: 8,
      margin: 0,
    },
  },
};

const MuiFormGroup: Components["MuiFormGroup"] = {
  styleOverrides: {
    root: {
      alignItems: FLEX_START,
      gap: 12,
    },
  },
};

const MuiFormHelperText: Components["MuiFormHelperText"] = {
  styleOverrides: {
    root: {
      font: FONT.BODY_SMALL_400,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-error": {
        color: PALETTE.ALERT_MAIN,
      },
    },
  },
};

const MuiIconButton: Components["MuiIconButton"] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    colorPrimary: {
      backgroundColor: PALETTE.PRIMARY_MAIN,
      boxShadow: `0 1px 0 0 ${PALETTE.PRIMARY_DARK}`,
      color: PALETTE.COMMON_WHITE,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-disabled": {
        backgroundColor: PALETTE.PRIMARY_MAIN,
        color: PALETTE.COMMON_WHITE,
        opacity: 0.5,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:hover": {
        backgroundColor: PALETTE.PRIMARY_DARK,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:active": {
        backgroundColor: PALETTE.PRIMARY_DARK,
        boxShadow: "none",
      },
    },
    colorSecondary: {
      backgroundColor: PALETTE.COMMON_WHITE,
      boxShadow: `inset 0 0 0 1px ${PALETTE.SMOKE_DARK}, 0 1px 0 0 ${COLOR_MIXES.COMMON_BLACK_05}`,
      color: PALETTE.INK_MAIN,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-disabled": {
        boxShadow: `inset 0 0 0 1px ${PALETTE.SMOKE_DARK}`,
        color: PALETTE.INK_LIGHT,
        opacity: 0.5,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:hover": {
        backgroundColor: PALETTE.SMOKE_LIGHTEST,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:active": {
        backgroundColor: PALETTE.SMOKE_LIGHTEST,
        boxShadow: `inset 0 0 0 1px ${PALETTE.SMOKE_DARK}`,
      },
    },
    root: {
      borderRadius: 4,
    },
    sizeLarge: {
      padding: 10,
    },
    sizeMedium: {
      padding: 8,
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
        color: PALETTE.INK_MAIN,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: PALETTE.SMOKE_LIGHT,
        },
      },
    },
    {
      props: {
        color: "inkLight",
      },
      style: {
        color: PALETTE.INK_LIGHT,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: PALETTE.SMOKE_LIGHT,
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

const MuiInputBase: Components<Theme>["MuiInputBase"] = {
  styleOverrides: {
    multiline: {
      height: "unset",
    },
    root: ({ theme }) => ({
      font: FONT.BODY_400,
      fontSize: 16, // overrides default 14px to prevent IOS zoom on focus.
      height: 40,
      letterSpacing: "normal",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      [bpUpSm({ theme })]: {
        fontSize: "14px",
      },
      variants: [
        /* PRIMARY */ /* TODO: remove `adornedStart` when all input components are refactored to color: secondary */
        {
          props: { color: "primary" },
          style: {
            adornedStart: {
              gap: 8,
            },
          },
        },
      ],
    }),
  },
};

const MuiLink: Components["MuiLink"] = {
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
    underlineNone: {
      "&:hover": {
        textDecoration: "none",
      },
    },
  },
};

const MuiListItemButton: Components["MuiListItemButton"] = {
  styleOverrides: {
    root: {
      font: FONT.BODY_400,
      minHeight: "unset",
      padding: "10px 16px",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:hover": {
        backgroundColor: PALETTE.SMOKE_LIGHT,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-selected": {
        backgroundColor: "unset",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: PALETTE.SMOKE_LIGHT,
        },
      },
    },
  },
};

const MuiListItemText: Components["MuiListItemText"] = {
  styleOverrides: {
    root: {
      margin: 0,
    },
  },
};

const MuiListSubheader: Components["MuiListSubheader"] = {
  defaultProps: { disableSticky: true },
  styleOverrides: {
    root: {
      color: PALETTE.INK_MAIN,
      font: FONT.BODY_500,
    },
  },
};

const MuiMenuItem: Components["MuiMenuItem"] = {
  defaultProps: { disableRipple: true },
  styleOverrides: {
    root: {
      font: FONT.BODY_400,
      minHeight: "unset",
      padding: "10px 16px",
    },
  },
};

const MuiOutlinedInput: Components["MuiOutlinedInput"] = {
  styleOverrides: {
    input: {
      color: PALETTE.INK_LIGHT,
      height: 20,
      padding: "10px 14px 10px 0",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:focus": {
        color: PALETTE.INK_MAIN,
      },
    },
    notchedOutline: {
      borderColor: PALETTE.SMOKE_DARK,
    },
    root: {
      backgroundColor: PALETTE.COMMON_WHITE,
      boxShadow: `inset 0 2px 0 0 ${COLOR_MIXES.COMMON_BLACK_04}`,
      paddingLeft: 12, // TODO: remove when all input components are refactored to color: secondary.
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: PALETTE.SMOKE_DARK,
        },
      },
      // eslint-disable-next-line sort-keys -- disabling key order for specificity
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: PALETTE.INK_MAIN,
          borderWidth: 1,
        },
      },
      // eslint-disable-next-line sort-keys -- disabling key order for specificity
      "&.Mui-disabled": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: PALETTE.SMOKE_DARK,
          borderWidth: 1,
        },
      },
      "&.Mui-error": {
        backgroundColor: PALETTE.ALERT_LIGHTEST,
        // eslint-disable-next-line sort-keys -- disabling key order for specificity
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: PALETTE.ALERT_MAIN,
          borderWidth: 1,
        },
      },
      variants: [
        /* PRIMARY */
        {
          props: { color: OUTLINED_INPUT_PROPS.COLOR.PRIMARY },
          style: {
            "& .MuiSvgIcon-root": {
              color: PALETTE.INK_LIGHT, // Adornment e.g. "SearchIcon". TODO: remove when all input components are refactored to color: secondary.
            },
            // eslint-disable-next-line sort-keys -- disabling key order for specificity
            "&.Mui-focused": {
              "& .MuiSvgIcon-root": {
                color: PALETTE.INK_MAIN, // Adornment e.g. "SearchIcon". TODO: remove when all input components are refactored to color: secondary.
              },
            },
            // eslint-disable-next-line sort-keys -- disabling key order for specificity
            "&.Mui-disabled": {
              "& .MuiSvgIcon-root": {
                color: PALETTE.INK_LIGHT, // TODO: remove when all input components are refactored to color: secondary.
              },
            },
          },
        },
        /* SECONDARY */
        {
          props: { color: OUTLINED_INPUT_PROPS.COLOR.SECONDARY },
          style: {
            backgroundColor: PALETTE.COMMON_WHITE,
            boxShadow: `inset 0 2px 0 0 ${COLOR_MIXES.COMMON_BLACK_04}`,
            color: PALETTE.INK_LIGHT,
            padding: "0 12px",
            // eslint-disable-next-line sort-keys -- disabling key order for specificity
            ".MuiOutlinedInput-input": {
              color: "inherit",
              height: 20,
              padding: "10px 0",
              // eslint-disable-next-line sort-keys -- disabling key order for specificity
              "&::placeholder": {
                color: "inherit",
                opacity: 0.8,
              },
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: PALETTE.SMOKE_DARK,
              borderWidth: 1,
            },
            // eslint-disable-next-line sort-keys -- disabling key order for specificity
            "&.Mui-focused": {
              color: PALETTE.INK_MAIN,
              // eslint-disable-next-line sort-keys -- disabling key order for specificity
              ".MuiOutlinedInput-input": {
                "&::placeholder": {
                  opacity: 0,
                },
              },
              // eslint-disable-next-line sort-keys -- disabling key order for specificity
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: PALETTE.INK_MAIN,
                borderWidth: 1,
              },
            },
            // eslint-disable-next-line sort-keys -- disabling key order for specificity
            "&.Mui-disabled": {
              backgroundColor: PALETTE.SMOKE_LIGHT,
              color: PALETTE.INK_LIGHT,
              // eslint-disable-next-line sort-keys -- disabling key order for specificity
              ".MuiOutlinedInput-input": {
                WebkitTextFillColor: "unset",
                // eslint-disable-next-line sort-keys -- disabling key order for specificity
                "&::placeholder": {
                  color: "inherit",
                  opacity: 1,
                },
              },
              // eslint-disable-next-line sort-keys -- disabling key order for specificity
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: PALETTE.SMOKE_DARK,
                borderWidth: 1,
              },
            },
          },
        },
      ],
    },
  },
};

const MuiPaper: Components["MuiPaper"] = {
  variants: [
    {
      props: { elevation: 1 },
      style: {
        boxShadow: SHADOWS["01"],
      },
    },
    {
      props: { elevation: 2 },
      style: {
        boxShadow: SHADOWS["02"],
      },
    },
    {
      props: { variant: "footer" },
      style: {
        backgroundColor: PALETTE.SMOKE_LIGHT,
        boxShadow: `inset 0 1px 0 0 ${PALETTE.SMOKE_MAIN}, inset 0 -1px 0 0 ${PALETTE.SMOKE_MAIN}`,
      },
    },
    {
      props: { variant: "menu" },
      style: {
        borderColor: PALETTE.SMOKE_DARK,
        borderRadius: 8,
        borderStyle: "solid",
        borderWidth: 1,
        boxShadow: SHADOWS["02"],
      },
    },
    {
      props: { variant: "panel" },
      style: {
        borderColor: PALETTE.SMOKE_MAIN,
        borderStyle: "solid",
        borderWidth: 1,
        boxShadow: SHADOWS["01"],
      },
    },
    {
      props: { variant: "searchbar" },
      style: {
        alignSelf: FLEX_START,
        borderColor: PALETTE.SMOKE_MAIN,
        borderRadius: 0,
        borderStyle: "solid",
        borderWidth: "0 0 1px 0",
        boxShadow: SHADOWS["01"],
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&.MuiDialog-paper": {
          marginLeft: 0,
          marginRight: 0,
          maxWidth: "100%",
          width: "100%",
        },
      },
    },
  ],
};

const MuiRadio: Components["MuiRadio"] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: {
      color: PALETTE.SMOKE_DARK,
      padding: 0,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-disabled": {
        color: PALETTE.SMOKE_DARK,
        opacity: "50%",
      },
      "&.MuiRadio-colorDefault": {
        color: PALETTE.INK_LIGHT,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&.Mui-disabled": {
          color: PALETTE.SMOKE_MAIN,
          opacity: "100%",
        },
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  },
};

const MuiSelect: Components["MuiSelect"] = {
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

const MuiSvgIcon: Components["MuiSvgIcon"] = {
  styleOverrides: {
    fontSizeLarge: {
      fontSize: "32px",
    },
    fontSizeSmall: {
      fontSize: "20px",
    },
    root: {
      "&.MuiSelect-icon": {
        color: PALETTE.INK_MAIN,
        right: 8,
      },
    },
  },
  variants: [
    {
      props: {
        color: "alert",
      },
      style: {
        color: PALETTE.ALERT_MAIN,
      },
    },
    {
      props: {
        color: "inkLight",
      },
      style: {
        color: PALETTE.INK_LIGHT,
      },
    },
    {
      props: {
        color: "inkMain",
      },
      style: {
        color: PALETTE.INK_MAIN,
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

const MuiTab: Components["MuiTab"] = {
  styleOverrides: {
    labelIcon: {
      gap: 8,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "& > img": {
        maxHeight: 20, // Tab image max height.
      },
    },
    root: {
      color: PALETTE.INK_LIGHT,
      font: FONT.BODY_500,
      marginBottom: 3,
      minHeight: "unset",
      minWidth: "unset",
      opacity: 1,
      padding: 12,
      textTransform: "capitalize",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-selected": {
        color: PALETTE.INK_MAIN,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "& > .MuiTab-iconWrapper": {
        marginRight: 0,
      },
    },
  },
};

const MuiTableSortLabel: Components["MuiTableSortLabel"] = {
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

const MuiTabs: Components<Theme>["MuiTabs"] = {
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
            color: PALETTE.INK_MAIN,
            overflow: "visible",
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "&:after": {
              backgroundColor: PALETTE.SMOKE_DARK,
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
      boxShadow: `inset 0 -1px 0 0 ${PALETTE.SMOKE_MAIN}`,
      minHeight: "unset",
      position: "relative", // Positions scroll fuzz.
    },
    scroller: ({ theme }) => ({
      margin: 0,
      padding: "0 8px",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      [bpUpSm({ theme })]: {
        padding: 0,
      },
    }),
  },
};

const MuiToggleButton: Components<Theme>["MuiToggleButton"] = {
  styleOverrides: {
    root: {
      backgroundColor: PALETTE.SMOKE_MAIN,
      border: "none",
      borderRadius: 4,
      color: PALETTE.INK_MAIN,
      flex: 1,
      font: FONT.BODY_500,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:hover": {
        backgroundColor: PALETTE.SMOKE_LIGHTEST,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-selected": {
        backgroundColor: PALETTE.COMMON_WHITE,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: PALETTE.COMMON_WHITE,
        },
      },
      variants: [
        {
          props: { size: TOGGLE_BUTTON_PROPS.SIZE.MEDIUM },
          style: { padding: "8px 16px" },
        },
      ],
    },
  },
};

const MuiToggleButtonGroup: Components["MuiToggleButtonGroup"] = {
  styleOverrides: {
    grouped: {
      border: "none !important", // Overrides "grouped" css selector specificity.
      borderRadius: "4px !important", // Overrides "grouped" css selector specificity.
      margin: "0 !important", // Overrides "grouped" css selector specificity.
    },
    root: {
      backgroundColor: PALETTE.SMOKE_MAIN,
      borderRadius: 6,
      color: PALETTE.INK_MAIN,
      display: "grid",
      gridAutoColumns: "1fr",
      gridAutoFlow: "column",
      padding: 2,
    },
  },
};

const MuiToolbar: Components<Theme>["MuiToolbar"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      [bpUpXs({ theme })]: {
        paddingLeft: 12,
        paddingRight: 12,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      [bpUpLg({ theme })]: {
        paddingLeft: 16,
        paddingRight: 16,
      },
    }),
  },
};

const MuiTooltip: Components["MuiTooltip"] = {
  defaultProps: {
    enterTouchDelay: 0,
    leaveTouchDelay: 4000,
    placement: "top",
  },
  styleOverrides: {
    arrow: {
      color: PALETTE.INK_MAIN,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:before": {
        borderRadius: 1,
      },
    },
    tooltip: {
      backgroundColor: PALETTE.INK_MAIN,
      boxShadow: SHADOWS["02"],
      boxSizing: "content-box",
      font: FONT.BODY_SMALL_400,
      padding: "8px 12px",
    },
  },
};

const MuiTypography: Components["MuiTypography"] = {
  defaultProps: {
    variant: "inherit",
  },
  styleOverrides: {
    gutterBottom: {
      marginBottom: 8,
    },
    root: {
      variants: [
        {
          props: { variant: TYPOGRAPHY_PROPS.VARIANT.UPPERCASE_500 },
          style: { textTransform: "uppercase" },
        },
      ],
    },
  },
};

export const components: ThemeOptions["components"] = {
  MuiAccordion,
  MuiAccordionDetails,
  MuiAccordionSummary,
  MuiAlert: C.MuiAlert,
  MuiAlertTitle: C.MuiAlertTitle,
  MuiAppBar,
  MuiBackdrop,
  MuiBreadcrumbs,
  MuiButton,
  MuiButtonBase,
  MuiButtonGroup: C.MuiButtonGroup,
  MuiCard,
  MuiCheckbox,
  MuiChip,
  MuiCircularProgress,
  MuiCssBaseline,
  MuiDialog,
  MuiDialogActions,
  MuiDialogContent,
  MuiDialogTitle,
  MuiDivider,
  MuiDrawer,
  MuiFormControlLabel,
  MuiFormGroup,
  MuiFormHelperText,
  MuiIconButton,
  MuiInputBase,
  MuiLink,
  MuiListItemButton,
  MuiListItemText,
  MuiListSubheader,
  MuiMenuItem,
  MuiOutlinedInput,
  MuiPaper,
  MuiRadio,
  MuiSelect,
  MuiSvgIcon,
  MuiSwitch: C.MuiSwitch,
  MuiTab,
  MuiTableCell: C.MuiTableCell,
  MuiTableSortLabel,
  MuiTabs,
  MuiToggleButton,
  MuiToggleButtonGroup,
  MuiToolbar,
  MuiTooltip,
  MuiTypography,
};

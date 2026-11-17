import type { Components, Theme } from "@mui/material";
import { COLOR_MIXES } from "../../../styles/common/constants/colorMixes";
import { FONT } from "../../../styles/common/constants/font";
import { PALETTE } from "../../../styles/common/constants/palette";
import { BUTTON_PROPS } from "./constants";
import type { ButtonVariant } from "./types";

const CONTAINED_PRIMARY_SHADOW = `0 1px 0 0 ${COLOR_MIXES.COMMON_BLACK_08}, inset 0 -1px 0 0 ${COLOR_MIXES.COMMON_BLACK_20}`;

const CONTAINED_SECONDARY_SHADOW = `inset 0 0 0 1px ${PALETTE.SMOKE_DARK}, 0 1px 0 0 ${COLOR_MIXES.COMMON_BLACK_05}`;

export const CONTAINED_PRIMARY: ButtonVariant = {
  props: {
    color: BUTTON_PROPS.COLOR.PRIMARY,
    variant: BUTTON_PROPS.VARIANT.CONTAINED,
  },
  style: {
    backgroundColor: PALETTE.PRIMARY_MAIN,
    boxShadow: CONTAINED_PRIMARY_SHADOW,
    color: PALETTE.COMMON_WHITE,
    // eslint-disable-next-line sort-keys -- disabling key order for readability
    "&:hover, &:active": {
      backgroundColor: PALETTE.PRIMARY_DARK,
      boxShadow: CONTAINED_PRIMARY_SHADOW,
    },
    // Keeps the shadow on keyboard focus; MUI's default focus shadow is the theme's `shadows[6]`, which is "none".
    // eslint-disable-next-line sort-keys -- disabling key order for readability
    "&.Mui-focusVisible": {
      boxShadow: CONTAINED_PRIMARY_SHADOW,
    },
    // eslint-disable-next-line sort-keys -- disabling key order for readability
    "&.Mui-disabled": {
      backgroundColor: PALETTE.PRIMARY_MAIN,
      boxShadow: "none",
      color: PALETTE.COMMON_WHITE,
      opacity: 0.5,
    },
  },
};

export const CONTAINED_SECONDARY: ButtonVariant = {
  props: {
    color: BUTTON_PROPS.COLOR.SECONDARY,
    variant: BUTTON_PROPS.VARIANT.CONTAINED,
  },
  style: {
    backgroundColor: PALETTE.COMMON_WHITE,
    boxShadow: CONTAINED_SECONDARY_SHADOW,
    color: PALETTE.INK_MAIN,
    // eslint-disable-next-line sort-keys -- disabling key order for readability
    "&:hover, &:active, &.Mui-focusVisible": {
      backgroundColor: PALETTE.SMOKE_LIGHTEST,
      boxShadow: CONTAINED_SECONDARY_SHADOW,
    },
    // eslint-disable-next-line sort-keys -- disabling key order for readability
    "&:disabled": {
      backgroundColor: PALETTE.COMMON_WHITE,
      boxShadow: `inset 0 0 0 1px ${PALETTE.SMOKE_DARK}`,
      color: PALETTE.INK_MAIN,
      opacity: 0.5,
    },
  },
};

export const OUTLINED_SECONDARY: ButtonVariant = {
  props: {
    color: BUTTON_PROPS.COLOR.SECONDARY,
    variant: BUTTON_PROPS.VARIANT.OUTLINED,
  },
  style: {
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
};

export const SIZE_LARGE: ButtonVariant = {
  props: { size: BUTTON_PROPS.SIZE.LARGE },
  style: {
    padding: "10px 16px",
    // eslint-disable-next-line sort-keys -- disabling key order for readability
    ".MuiButton-icon": {
      ".MuiSvgIcon-root": {
        fontSize: "20px",
      },
    },
  },
};

export const SIZE_MEDIUM: ButtonVariant = {
  props: { size: BUTTON_PROPS.SIZE.MEDIUM },
  style: { padding: "8px 16px" },
};

export const TEXT_PRIMARY: ButtonVariant = {
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
};

export const ACTIVE_NAV: ButtonVariant = {
  props: { variant: "activeNav" },
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
};

export const BACK_NAV: ButtonVariant = {
  props: { variant: "backNav" },
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
};

export const NAV: ButtonVariant = {
  props: { variant: "nav" },
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
};

/**
 * `MuiButton`'s variants, in cascade order: a later entry wins over an earlier one.
 * MUI's theme merge replaces arrays, so an app overrides one variant by spreading
 * this list and appending its own entry with the same `props`.
 */
export const BUTTON_VARIANTS: ButtonVariant[] = [
  CONTAINED_PRIMARY,
  CONTAINED_SECONDARY,
  OUTLINED_SECONDARY,
  SIZE_LARGE,
  SIZE_MEDIUM,
  TEXT_PRIMARY,
  ACTIVE_NAV,
  BACK_NAV,
  NAV,
];

export const MuiButton: Components<Theme>["MuiButton"] = {
  defaultProps: {
    disableRipple: true,
    disableTouchRipple: true,
  },
  styleOverrides: {
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
    root: {
      // Keyboard focus ring, matching the Figma library: MUI removes the outline and the ripple is off.
      "&.Mui-focusVisible": {
        outline: `2px solid ${PALETTE.PRIMARY_MAIN}`,
        outlineOffset: 2,
      },
      font: FONT.BODY_500,
      gap: 4,
      letterSpacing: "normal",
      padding: "10px 16px",
      textTransform: "capitalize",
      variants: BUTTON_VARIANTS,
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
};

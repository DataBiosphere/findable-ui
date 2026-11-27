import type { Components, Theme } from "@mui/material";
import { FONT } from "../../../styles/common/constants/font";
import { PALETTE } from "../../../styles/common/constants/palette";
import { CHIP_PROPS } from "./constants";
import type { ChipVariant } from "./types";

const FLEX_START = "flex-start";

export const SIZE_SMALL: ChipVariant = {
  props: { size: CHIP_PROPS.SIZE.SMALL },
  style: {
    height: 20,
  },
};

export const SIZE_MEDIUM: ChipVariant = {
  props: { size: CHIP_PROPS.SIZE.MEDIUM },
  style: {
    height: 24,
  },
};

export const COLOR_CAUTION: ChipVariant = {
  props: { color: CHIP_PROPS.COLOR.CAUTION },
  style: {
    backgroundColor: PALETTE.CAUTION_LIGHT,
    color: PALETTE.CAUTION_MAIN,
  },
};

export const COLOR_DEFAULT: ChipVariant = {
  props: { color: CHIP_PROPS.COLOR.DEFAULT },
  style: {
    backgroundColor: PALETTE.SMOKE_MAIN,
    color: PALETTE.INK_MAIN,
  },
};

export const COLOR_ERROR: ChipVariant = {
  props: { color: CHIP_PROPS.COLOR.ERROR },
  style: {
    backgroundColor: PALETTE.ALERT_LIGHT,
    color: PALETTE.ALERT_MAIN,
  },
};

export const COLOR_INFO: ChipVariant = {
  props: { color: CHIP_PROPS.COLOR.INFO },
  style: {
    backgroundColor: PALETTE.INFO_LIGHT,
    color: PALETTE.INFO_MAIN,
  },
};

export const FILLED_PRIMARY: ChipVariant = {
  props: {
    color: CHIP_PROPS.COLOR.PRIMARY,
    variant: CHIP_PROPS.VARIANT.FILLED,
  },
  style: {
    backgroundColor: PALETTE.PRIMARY_MAIN,
    color: PALETTE.COMMON_WHITE,
  },
};

export const COLOR_SUCCESS: ChipVariant = {
  props: { color: CHIP_PROPS.COLOR.SUCCESS },
  style: {
    backgroundColor: PALETTE.SUCCESS_LIGHT,
    color: PALETTE.SUCCESS_MAIN,
  },
};

export const COLOR_WARNING: ChipVariant = {
  props: { color: CHIP_PROPS.COLOR.WARNING },
  style: {
    backgroundColor: PALETTE.WARNING_LIGHT,
    color: PALETTE.WARNING_MAIN,
  },
};

export const FILTER_TAG: ChipVariant = {
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
};

/**
 * Styles for the `ntag` variant, kept for chips that set it until it is removed.
 * @deprecated Use `NTagChip` from `contracts/cc/NTagChip/nTagChip`, which draws the same chip without it.
 */
export const N_TAG: ChipVariant = {
  props: { variant: "ntag" },
  style: {
    backgroundColor: PALETTE.SMOKE_MAIN,
    boxShadow: `0 0 0 2px ${PALETTE.COMMON_WHITE}`,
    font: FONT.BODY_SMALL_400,
    height: 24,
    justifySelf: FLEX_START,
    minWidth: 0,
  },
};

/**
 * Styles for the `status` variant, kept for `StatusBadge` and chips that set it until it is removed.
 * @deprecated Use `StatusChip` from `contracts/cc/StatusChip/statusChip`, which draws the same chip without it.
 */
export const STATUS: ChipVariant = {
  props: { variant: "status" },
  style: {
    boxShadow: `0 0 0 2px ${PALETTE.COMMON_WHITE}`,
    height: 20,
    maxWidth: "fit-content",
    minWidth: 0,
  },
};

/**
 * Text colour for the `status` variant with the default colour.
 * @deprecated Use `StatusChip` from `contracts/cc/StatusChip/statusChip`, which draws the same chip without it.
 */
export const STATUS_DEFAULT: ChipVariant = {
  props: { color: CHIP_PROPS.COLOR.DEFAULT, variant: "status" },
  style: {
    color: PALETTE.INK_LIGHT,
  },
};

/**
 * `MuiChip`'s variants, in cascade order: a later entry wins over an earlier one.
 * MUI's theme merge replaces arrays, so an app overrides one variant by spreading
 * this list and appending its own entry with the same `props`.
 */
export const CHIP_VARIANTS: ChipVariant[] = [
  SIZE_SMALL,
  SIZE_MEDIUM,
  COLOR_DEFAULT,
  COLOR_ERROR,
  COLOR_INFO,
  FILLED_PRIMARY,
  COLOR_SUCCESS,
  COLOR_WARNING,
  COLOR_CAUTION,
  FILTER_TAG,
  N_TAG,
  STATUS,
  STATUS_DEFAULT,
];

export const MuiChip: Components<Theme>["MuiChip"] = {
  defaultProps: {
    size: CHIP_PROPS.SIZE.SMALL,
  },
  styleOverrides: {
    deleteIcon: {
      color: "inherit",
      margin: "0 -2px 0 0",
    },
    label: {
      font: FONT.BODY_SMALL_400,
      variants: [
        // Deprecated `status` variant; `StatusChip` sets this label font itself.
        {
          props: { variant: "status" },
          style: {
            font: FONT.BODY_SMALL_500,
          },
        },
      ],
    },
    root: {
      variants: CHIP_VARIANTS,
    },
  },
};

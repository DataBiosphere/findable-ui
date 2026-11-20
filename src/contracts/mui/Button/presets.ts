import type { ButtonOwnProps } from "@mui/material";
import { BUTTON_PROPS } from "./constants";

/**
 * MUI `Button` color, variant and size combinations that findable-ui's buttons use, spread onto a button:
 * `<Button {...BUTTON_PRESETS.PRIMARY_CONTAINED}>`.
 */
export const BUTTON_PRESETS = {
  PRIMARY_CONTAINED: {
    color: BUTTON_PROPS.COLOR.PRIMARY,
    variant: BUTTON_PROPS.VARIANT.CONTAINED,
  },
  PRIMARY_LARGE_CONTAINED: {
    color: BUTTON_PROPS.COLOR.PRIMARY,
    size: BUTTON_PROPS.SIZE.LARGE,
    variant: BUTTON_PROPS.VARIANT.CONTAINED,
  },
  PRIMARY_MEDIUM_CONTAINED: {
    color: BUTTON_PROPS.COLOR.PRIMARY,
    size: BUTTON_PROPS.SIZE.MEDIUM,
    variant: BUTTON_PROPS.VARIANT.CONTAINED,
  },
  PRIMARY_TEXT: {
    color: BUTTON_PROPS.COLOR.PRIMARY,
    variant: BUTTON_PROPS.VARIANT.TEXT,
  },
  SECONDARY_LARGE_OUTLINED: {
    color: BUTTON_PROPS.COLOR.SECONDARY,
    size: BUTTON_PROPS.SIZE.LARGE,
    variant: BUTTON_PROPS.VARIANT.OUTLINED,
  },
  SECONDARY_MEDIUM_OUTLINED: {
    color: BUTTON_PROPS.COLOR.SECONDARY,
    size: BUTTON_PROPS.SIZE.MEDIUM,
    variant: BUTTON_PROPS.VARIANT.OUTLINED,
  },
  SECONDARY_OUTLINED: {
    color: BUTTON_PROPS.COLOR.SECONDARY,
    variant: BUTTON_PROPS.VARIANT.OUTLINED,
  },
} as const satisfies Record<string, Partial<ButtonOwnProps>>;

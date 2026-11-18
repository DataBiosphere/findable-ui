import type { ButtonProps } from "@mui/material";
import { BUTTON_PROPS } from "../constants";

/**
 * The `color` and `variant` pairs findable-ui styles, matching the Findable-Contract Figma library's `mui/Button`.
 */
export const COMBINATIONS: Pick<ButtonProps, "color" | "variant">[] = [
  {
    color: BUTTON_PROPS.COLOR.PRIMARY,
    variant: BUTTON_PROPS.VARIANT.CONTAINED,
  },
  {
    color: BUTTON_PROPS.COLOR.SECONDARY,
    variant: BUTTON_PROPS.VARIANT.OUTLINED,
  },
  { color: BUTTON_PROPS.COLOR.PRIMARY, variant: BUTTON_PROPS.VARIANT.TEXT },
];

/**
 * The sizes findable-ui styles.
 */
export const SIZES: ButtonProps["size"][] = [
  BUTTON_PROPS.SIZE.MEDIUM,
  BUTTON_PROPS.SIZE.LARGE,
];

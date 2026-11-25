import type { ChipProps } from "@mui/material";
import { CHIP_PROPS } from "../constants";

/**
 * The colours findable-ui styles, matching the Findable-Contract Figma library's `mui/Chip`.
 */
export const COLORS: ChipProps["color"][] = [
  CHIP_PROPS.COLOR.DEFAULT,
  CHIP_PROPS.COLOR.ERROR,
  CHIP_PROPS.COLOR.INFO,
  CHIP_PROPS.COLOR.PRIMARY,
  CHIP_PROPS.COLOR.SUCCESS,
  CHIP_PROPS.COLOR.WARNING,
];

/**
 * The sizes findable-ui styles.
 */
export const SIZES: ChipProps["size"][] = [
  CHIP_PROPS.SIZE.SMALL,
  CHIP_PROPS.SIZE.MEDIUM,
];

/**
 * The variants the Findable-Contract Figma library's `mui/Chip` has.
 */
export const VARIANTS: ChipProps["variant"][] = [
  CHIP_PROPS.VARIANT.FILLED,
  CHIP_PROPS.VARIANT.OUTLINED,
];

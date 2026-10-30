import type { PopperProps } from "@mui/material";
import { resolveAriaLabel } from "../../../../utils/ariaLabel";
import { SURFACE_TYPE } from "../surfaces/types";
import {
  MENU_POPPER_OPTIONS,
  POPPER_PROPS,
} from "./components/Popper/constants";
import { ARIA_LABEL } from "./constants";

/**
 * Returns the accessible name for a category filter panel's close button. On
 * the drawer surface this button and the filter drawer's own close button are
 * in the tree together, so the name has to say which of the two it closes —
 * including the fallback taken when the category has no usable label.
 * @param categoryLabel - Label of the category the panel filters on.
 * @returns The close button's accessible name.
 */
export function getCloseCategoryLabel(categoryLabel: string): string {
  const label = categoryLabel?.trim();
  return resolveAriaLabel(
    label && `Close ${label} filter`,
    ARIA_LABEL.CLOSE_CATEGORY,
  );
}

/**
 * Returns the popper options for the filter panel: over the menu surface, fixed to the window and updated after each page scroll (see MENU_POPPER_OPTIONS); in the drawer, the defaults.
 * The options are constants, so the popper is not rebuilt on every render.
 * @param surfaceType - Filter surface type.
 * @returns The popper options.
 */
export function getPopperOptions(
  surfaceType: SURFACE_TYPE,
): PopperProps["popperOptions"] {
  if (surfaceType === SURFACE_TYPE.DRAWER) return POPPER_PROPS.popperOptions;
  return MENU_POPPER_OPTIONS;
}

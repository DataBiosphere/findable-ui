import {
  AppBarProps as MAppBarProps,
  ToolbarProps as MToolbarProps,
} from "@mui/material";
import { PROPERTY } from "../../../../../hooks/useHtmlStyle/constants";

export const HEADER_HEIGHT = 56;

/**
 * Header height as a CSS value, for elements that pin below the sticky header.
 * Reads the measured height from the `--header-height` custom property, falling
 * back to the toolbar height plus the app bar's 1px bottom border until the
 * header is measured.
 */
export const HEADER_HEIGHT_VAR = `var(${PROPERTY.HEADER_HEIGHT}, ${HEADER_HEIGHT + 1}px)`;

/**
 * Sticky keeps the header in flow, so content follows it whatever its height,
 * including any announcements, and it pins to the top once the page scrolls.
 */
export const APP_BAR_PROPS: Partial<MAppBarProps> = {
  elevation: 1,
  position: "sticky",
};

export const FADE_TRANSITION_PROPS = {
  appear: false,
  timeout: 0,
  unmountOnExit: true,
};

export const TOOLBAR_PROPS: Partial<MToolbarProps> = {
  variant: "dense",
};

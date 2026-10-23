import { PROPERTY } from "../../../../../hooks/useHtmlStyle/constants";

export const FOOTER_HEIGHT = 56;

/**
 * Footer height as a CSS value. Reads the measured height from the
 * `--footer-height` custom property, falling back to the footer's toolbar
 * height (from the "sm" breakpoint up) until the footer is measured.
 */
export const FOOTER_HEIGHT_VAR = `var(${PROPERTY.FOOTER_HEIGHT}, ${FOOTER_HEIGHT}px)`;

/**
 * View timeline of the footer scrolling into view, scoped to the app layout,
 * e.g. for a sticky sidebar to shrink as the footer pushes up the end of its
 * column.
 */
export const FOOTER_VIEW_TIMELINE = "--footer-view";

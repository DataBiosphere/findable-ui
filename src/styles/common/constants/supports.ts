/**
 * Feature query for scroll-driven animations. Where it holds, index pages scroll
 * as a page and a copy of the table's column head follows the table's sideways
 * scroll, and a sticky sidebar shrinks as the footer scrolls in. Where it fails,
 * the index page fits the window and the table scrolls in its own box, as
 * before, and the footer pushes the sidebar up.
 */
export const SUPPORTS_SCROLL_DRIVEN_ANIMATIONS =
  "(animation-timeline: scroll())";

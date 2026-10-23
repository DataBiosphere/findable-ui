/**
 * Feature query for the scrolling page layout: scroll-driven animations. Where
 * it holds, index pages scroll as a page and a copy of the table's column head
 * follows the table's sideways scroll, and a sticky sidebar shrinks as the
 * footer scrolls in. Where it fails, the index page fits the window and the
 * table scrolls in its own box, as before.
 */
export const SUPPORTS_PAGE_SCROLL = "(animation-timeline: scroll())";

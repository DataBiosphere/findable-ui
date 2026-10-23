/**
 * Feature query for the scrolling index page. The page scrolls, not the table,
 * and the table's column head pins through a copy that follows the table's
 * sideways scroll with a scroll-driven animation. Where the query fails, the
 * index page fits the window and the table scrolls in its own box, as before.
 */
export const SUPPORTS_PAGE_SCROLL = "(animation-timeline: scroll())";

/**
 * Custom property holding the table's computed column widths, for the pinned
 * copy of its column head.
 */
export const STICKY_HEAD_COLUMNS = "--table-columns";

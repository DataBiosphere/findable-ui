/**
 * Feature query for scroll-driven animations, including `timeline-scope`
 * (Chrome 116+), which shares a scroll or view timeline with elements outside
 * its subtree: the table's sideways scroll with its pinned head copy, and the
 * footer's view timeline with pinned columns (see `pinnedAboveFooter`). Where
 * it holds, index pages scroll as a page and a copy of the table's column head
 * follows the table's sideways scroll, and pinned columns (the explore sidebar,
 * content page navigation and outline) shrink as the footer scrolls in. Where
 * it fails, the index page fits the window and the table scrolls in its own
 * box, as before, and the footer pushes those columns up.
 */
export const SUPPORTS_SCROLL_DRIVEN_ANIMATIONS =
  "((animation-timeline: scroll()) and (timeline-scope: none))";

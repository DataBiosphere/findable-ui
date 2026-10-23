import { HEADER_HEIGHT_VAR } from "../../../Layout/components/Header/common/constants";

export const LAYOUT_SPACING = {
  CONTENT_PADDING_BOTTOM: 24,
  CONTENT_PADDING_TOP: 16,
  FILTERS_HEIGHT: 40,
  FILTERS_PADDING_BOTTOM: 16,
  FILTERS_PADDING_TOP: 16,
  OUTLINE_PADDING_TOP: 16,
  TITLE_HEIGHT: 74,
};

/**
 * Height of the filters with no filter tags, which targets scroll to clear
 * before the filters are measured.
 */
export const FILTERS_FALLBACK_HEIGHT =
  LAYOUT_SPACING.FILTERS_PADDING_TOP +
  LAYOUT_SPACING.FILTERS_HEIGHT +
  LAYOUT_SPACING.FILTERS_PADDING_BOTTOM;

/**
 * Where the filters and outline pin: below the sticky header and the title row.
 */
export const TITLE_BOTTOM = `calc(${HEADER_HEIGHT_VAR} + ${LAYOUT_SPACING.TITLE_HEIGHT}px)`;

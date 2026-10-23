import type { CSSPropHyphen } from "./types";

export const PROPERTY = {
  DATA_DICTIONARY_FILTERS_HEIGHT: "--data-dictionary-filters-height",
  ENTITY_LAYOUT_HEIGHT: "--entity-layout-height",
  FOOTER_HEIGHT: "--footer-height",
  HEADER_HEIGHT: "--header-height",
} as const satisfies Record<string, CSSPropHyphen>;

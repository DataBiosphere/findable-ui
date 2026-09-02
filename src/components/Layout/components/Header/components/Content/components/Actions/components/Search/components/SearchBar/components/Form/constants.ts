import type { InputProps } from "@mui/material";

export const ARIA_LABEL = {
  CLEAR: "Clear search",
  SEARCH_TERM: "Search",
} as const;

export const FIELD_NAME = {
  SEARCH_TERM: "search-term",
} as const;

export const INPUT_PROPS: InputProps = {
  autoComplete: "off",
  autoFocus: true,
  disableUnderline: true,
  fullWidth: true,
  // MUI spreads root-level props onto the wrapper, so the accessible name has
  // to be routed to the input element itself.
  inputProps: { "aria-label": ARIA_LABEL.SEARCH_TERM },
  name: FIELD_NAME.SEARCH_TERM,
  placeholder: "Type in keywords...",
};

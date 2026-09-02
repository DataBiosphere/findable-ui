import type { InputProps } from "@mui/material";

export const FIELD_NAME = {
  SEARCH_TERM: "search-term",
} as const;

export const INPUT_PROPS: InputProps = {
  autoComplete: "off",
  autoFocus: true,
  disableUnderline: true,
  fullWidth: true,
  name: FIELD_NAME.SEARCH_TERM,
  placeholder: "Type in keywords...",
};

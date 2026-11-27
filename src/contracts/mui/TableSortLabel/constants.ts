import type { TableSortLabelProps } from "@mui/material";

const DIRECTION = {
  ASC: "asc",
  DESC: "desc",
} as const satisfies Record<string, TableSortLabelProps["direction"]>;

/**
 * MUI `TableSortLabel`'s prop values, so components don't write bare strings:
 * `direction={TABLE_SORT_LABEL_PROPS.DIRECTION.DESC}`.
 */
export const TABLE_SORT_LABEL_PROPS = {
  DIRECTION,
} as const;

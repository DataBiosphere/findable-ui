import type { TableSortLabelProps } from "@mui/material";
import { TABLE_SORT_LABEL_PROPS } from "../constants";

/**
 * The sort directions, matching the Findable-Contract Figma library's `mui/TableSortLabel`.
 */
export const DIRECTIONS: TableSortLabelProps["direction"][] = [
  TABLE_SORT_LABEL_PROPS.DIRECTION.ASC,
  TABLE_SORT_LABEL_PROPS.DIRECTION.DESC,
];

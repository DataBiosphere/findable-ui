import { FilterMeta } from "@tanstack/react-table";

/**
 * Filter metadata the fuzzy global filter records for a column, with whether its value passed the ranking threshold.
 */
export interface ColumnFilterMeta extends FilterMeta {
  passed?: boolean;
}

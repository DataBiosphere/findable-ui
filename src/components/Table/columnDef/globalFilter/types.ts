import { FilterMeta } from "@tanstack/react-table";

export interface ColumnFilterMeta extends FilterMeta {
  passed?: boolean;
}

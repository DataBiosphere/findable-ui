import { ColumnMeta } from "@tanstack/table-core";
import { ColumnConfig } from "../../../config/entities";

export interface BaseColumnConfig<T, TValue> extends ColumnConfig<T> {
  meta?: ColumnMeta<T, TValue>;
}

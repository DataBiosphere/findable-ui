import { TableOptions } from "@tanstack/react-table";
import { TableKey } from "../state/tables/types";

export type InitialArgs<T = unknown> = Record<TableKey, TableDefinition<T>>;

export interface TableDefinition<T = unknown> {
  groupKey: string;
  tableOptions: Partial<TableOptions<T>>;
}

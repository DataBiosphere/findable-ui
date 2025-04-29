import { RowData, TableOptions } from "@tanstack/react-table";
import { useConfig } from "../../../../hooks/useConfig";

/**
 * Returns the TableOptions for the table, defined in the entity configuration.
 * @returns TableOptions.
 */
export function useTableOptions<T extends RowData>(): Partial<
  Omit<TableOptions<T>, "data" | "columns">
> {
  const { entityConfig } = useConfig();
  const {
    list: { tableOptions },
  } = entityConfig;

  return { ...tableOptions };
}

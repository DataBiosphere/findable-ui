import { useTable } from "../table/useTable";
import { useEntities } from "../../../../../hooks/UseEntities/hook";
import { EntityListTable } from "../../../types";
import { throwError } from "../../utils";
import { useAdapter as useStateAdapter } from "../../../state/adapter/useAdapter";
import { useTableState } from "../../../../../../../providers/tables/hooks/UseTableState/hook";
import * as resets from "./resets";

/**
 * Creates an entity-aware table adapter using a server-side filter strategy.
 *
 * This acts as the boundary between entity metadata and table implementation.
 *
 * @template T - Entity type.
 * @param entityListType - Entity identifier.
 * @param data - Dataset.
 * @returns TanStack table instance.
 */
export const useAdapter = <T = unknown>(
  entityListType: string,
  data: T[],
): EntityListTable<T> => {
  const { table: tableOptions } = useEntities<T>(entityListType);
  const { columns, ...options } = tableOptions || {};
  const { state } = useTableState(entityListType);
  const { adapter } = useStateAdapter(entityListType);

  if (!columns) throwError(entityListType);

  const table = useTable({
    columns,
    data,
    onColumnFiltersChange: (updaterOrValue) => {
      adapter.onColumnFiltersChange(updaterOrValue);
      resets.forColumnFiltersChange(table);
    },
    ...options,
    state,
  });

  return { table };
};

import { useTable } from "../table/useTable";
import { useEntities } from "../../../../../hooks/UseEntities/hook";
import { EntityListTable } from "../../../types";
import { throwError } from "../../utils";
import { useAdapter as useStateAdapter } from "../../../state/adapter/useAdapter";
import { useTableState } from "../../../../../../../providers/tables/hooks/UseTableState/hook";
import * as resets from "./resets";
import { useServerData } from "../../../../data/strategies/SSFetchSSFilter/provider/hook";
import { useRevision } from "../../../../../../../providers/revision/hook";

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
  const { revision } = useRevision();
  const { state } = useTableState(entityListType, revision);
  const { adapter } = useStateAdapter(entityListType);
  const { pageCount } = useServerData();

  if (!columns) throwError(entityListType);

  const table = useTable({
    columns,
    data,
    onColumnFiltersChange: (updaterOrValue) => {
      resets.forColumnFiltersChange(table);
      adapter.onColumnFiltersChange(updaterOrValue);
    },
    onPaginationChange: (updaterOrValue) => {
      adapter.onPaginationChange(updaterOrValue);
    },
    ...options,
    pageCount,
    state,
  });

  return { table };
};

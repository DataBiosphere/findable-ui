import { useTable } from "../table/useTable";
import { useEntities } from "../../../../../hooks/UseEntities/hook";
import { EntityListTable } from "../../../types";

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
  const {
    getId: getRowId,
    list: { columns, tableOptions },
  } = useEntities(entityListType);

  const table = useTable({
    columns,
    data,
    getRowId,
    state: {},
    ...tableOptions,
  });

  return { table };
};

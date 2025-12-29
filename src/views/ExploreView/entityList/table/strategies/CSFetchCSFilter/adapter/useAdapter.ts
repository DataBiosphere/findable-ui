import { useTable } from "../table/useTable";
import { useEntities } from "../../../../../hooks/UseEntities/hook";
import { EntityListTable } from "../../../types";
import { throwError } from "../../utils";

/**
 * Creates an entity-aware table adapter using a client-side filter strategy.
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

  if (!columns) throwError(entityListType);

  const table = useTable<T>({
    columns,
    data,
    state: {},
    ...options,
  });

  return { table };
};

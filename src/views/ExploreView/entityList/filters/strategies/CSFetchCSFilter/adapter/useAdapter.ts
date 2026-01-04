import { useEntities } from "../../../../../hooks/UseEntities/hook";
import { EntityListFilter } from "../../../types";
import { Table } from "@tanstack/react-table";

/**
 * Creates an entity-aware filter adapter using a client-side filter strategy.
 *
 * This acts as the boundary between entity metadata and filter implementation.
 *
 * @template T - Entity type.
 * @param entityListType - Entity identifier.
 * @param table - Table instance.
 * @returns Category filters.
 */
export const useAdapter = <T = unknown>(
  entityListType: string,
  table: Table<T>,
): EntityListFilter => {
  const { categoryGroupConfig } = useEntities<T>(entityListType);

  return {
    categoryFilters: [],
  };
};

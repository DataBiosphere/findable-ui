import { useServerData } from "../../../../../entityList/data/strategies/SSFetchSSFilter/provider/hook";
import { useDefinition } from "../../../definition/useDefinition";
import { EntityListFilter } from "../../../types";
import { Table } from "@tanstack/react-table";
import { buildCategoryFilters } from "./utils";
import { useMemo } from "react";

/**
 * Creates an entity-aware filter adapter using a server-side filter strategy.
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
  const { categoryDefinition } = useDefinition(entityListType);
  const { termFacets } = useServerData();
  const { getState } = table;
  const { columnFilters } = getState();

  const categoryFilters = useMemo(
    () => buildCategoryFilters(categoryDefinition, columnFilters, termFacets),
    [categoryDefinition, columnFilters, termFacets],
  );

  return { categoryFilters };
};

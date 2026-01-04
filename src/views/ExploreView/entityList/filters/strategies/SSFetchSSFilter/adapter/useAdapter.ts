import { useServerData } from "../../../../../entityList/data/strategies/SSFetchSSFilter/provider/hook";
import { useDefinition } from "../../../definition/useDefinition";
import { EntityListFilter } from "../../../types";
import { Table } from "@tanstack/react-table";
import { buildCategoryFilters } from "./utils";
import { useMemo } from "react";
import { FILTER_SORT } from "../../../../../../../common/filters/sort/config/types";

/**
 * Creates an entity-aware filter adapter using a server-side filter strategy.
 *
 * Acts as the boundary between entity metadata, server facet data,
 * and table filters.
 *
 * @template T - Entity type.
 * @param entityListType - Entity identifier.
 * @param filterSort - Filter sort.
 * @param table - Table instance.
 * @returns Category filters.
 */
export const useAdapter = <T = unknown>(
  entityListType: string,
  filterSort: FILTER_SORT,
  table: Table<T>,
): EntityListFilter => {
  const { categoryDefinition } = useDefinition(entityListType);
  const { termFacets } = useServerData();
  const { categoryGroups } = categoryDefinition;
  const { columnFilters } = table.getState();

  const categoryFilters = useMemo(
    () =>
      buildCategoryFilters(
        categoryGroups,
        filterSort,
        columnFilters,
        termFacets,
      ),
    [categoryGroups, columnFilters, filterSort, termFacets],
  );

  return { categoryFilters };
};

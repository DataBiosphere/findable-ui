import { Fragment, JSX } from "react";
import { useAdapter } from "./adapter/useAdapter";
import { FilterSelectorProps } from "../../selector/types";

/**
 * Server-side fetch and server-side filter strategy filter implementation.
 * Delegates category filters to useAdapter hook.
 *
 * @template T - Entity type.
 * @param props - Component props.
 * @param props.children - Child component.
 * @param props.entityListType - Entity identifier.
 * @param props.filterSort - Filter sort.
 * @param props.table - Table instance.
 * @returns Rendered children with category filters.
 */
export const SSFetchSSFilter = <T = unknown,>({
  children,
  entityListType,
  filterSort,
  table,
}: FilterSelectorProps<T>): JSX.Element => {
  const { categoryFilters } = useAdapter<T>(entityListType, filterSort, table);
  return <Fragment>{children({ categoryFilters })}</Fragment>;
};

import { Fragment, JSX } from "react";
import { useAdapter } from "./adapter/useAdapter";
import { FilterSelectorProps } from "../../selector/types";

/**
 * Server-side fetch and server-side filter strategy filter implementation.
 * Delegates filter logic to useAdapter hook.
 *
 * @template T - Entity type.
 * @param props - Component props.
 * @param props.children - Child component.
 * @param props.entityListType - Entity identifier.
 * @param props.table - Table instance.
 * @returns Rendered children with category filters.
 */
export const SSFetchSSFilter = <T = unknown,>({
  children,
  entityListType,
  table,
}: FilterSelectorProps<T>): JSX.Element => {
  const { filters } = useAdapter<T>(entityListType, table);
  return <Fragment>{children({ filters })}</Fragment>;
};

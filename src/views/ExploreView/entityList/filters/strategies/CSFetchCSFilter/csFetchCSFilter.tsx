import { Fragment, JSX } from "react";
import { FilterSelectorProps } from "../../selector/types";
import { useAdapter } from "./adapter/useAdapter";

/**
 * Client-side fetch and client-side filter strategy filter implementation.
 * Delegates filter logic to useAdapter hook.
 *
 * @template T - Entity type.
 * @param props - Component props.
 * @param props.children - Child component.
 * @param props.entityListType - Entity identifier.
 * @param props.table - Table instance.
 * @returns Rendered children with category filters.
 */
export const CSFetchCSFilter = <T = unknown,>({
  children,
  entityListType,
  table,
}: FilterSelectorProps<T>): JSX.Element => {
  const { filters } = useAdapter<T>(entityListType, table);
  return <Fragment>{children({ filters })}</Fragment>;
};

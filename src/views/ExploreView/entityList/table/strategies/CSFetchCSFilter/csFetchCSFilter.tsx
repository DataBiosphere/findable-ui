import { Fragment, JSX } from "react";
import { TableSelectorProps } from "../../selector/types";
import { useAdapter } from "./adapter/useAdapter";

/**
 * Client-side fetch and client-side filter strategy table implementation.
 * Delegates table logic to useAdapter hook.
 *
 * @template T - Entity type.
 * @param props - Component props.
 * @param props.children - Child component.
 * @param props.data - Dataset (client-side).
 * @param props.entityListType - Entity identifier.
 * @returns Rendered children with table.
 */
export const CSFetchCSFilter = <T = unknown,>({
  children,
  data = [],
  entityListType,
}: TableSelectorProps<T>): JSX.Element => {
  const { table } = useAdapter<T>(entityListType, data);
  return <Fragment>{children({ table })}</Fragment>;
};

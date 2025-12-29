import { Fragment, JSX } from "react";
import { TableSelectorProps } from "../../selector/types";
import { useAdapter } from "../CSFetchCSFilter/adapter/useAdapter";

/**
 * Server-side fetch and client-side filter strategy table implementation.
 * Delegates table logic to client-side adapter (for client-side filtering).
 *
 * @template T - Entity type.
 * @param props - Component props.
 * @param props.children - Child component.
 * @param props.data - Dataset (client-side).
 * @param props.entityListType - Entity identifier.
 * @returns Rendered children with table.
 */
export const SSFetchCSFilter = <T = unknown,>({
  children,
  data = [],
  entityListType,
}: TableSelectorProps<T>): JSX.Element => {
  const { table } = useAdapter<T>(entityListType, data);
  return <Fragment>{children({ table })}</Fragment>;
};

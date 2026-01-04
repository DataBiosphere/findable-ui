import { Fragment, JSX } from "react";
import { useAdapter } from "./adapter/useAdapter";
import { DataSelectorProps } from "../../selector/types";

/**
 * Server-side fetch and client-side filter strategy.
 *
 * Fetches entity data from the server.
 * Delegates data fetching logic to useAdapter hook.
 *
 * @typeParam T - Entity type.
 * @param props - Component props.
 * @param props.children - Child component to render with server-fetched data.
 * @param props.entityListType - Entity identifier.
 * @returns Rendered children with server-fetched data.
 */
export const SSFetchCSFilter = <T = unknown,>({
  children,
  entityListType,
}: DataSelectorProps<T>): JSX.Element => {
  const { data, isFetching } = useAdapter<T>(entityListType);
  return <Fragment>{children({ data, isFetching })}</Fragment>;
};

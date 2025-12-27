import { Fragment, JSX } from "react";
import { useSSFetchSSFilter } from "./hooks/UseSSFetchSSFilter/hook";
import { EntityListStrategyProps } from "../../EntityListStrategy/types";

/**
 * Server-side fetching and server-side filtering strategy.
 *
 * Fetches entity data from the server with server-side filtering applied.
 * Delegates data fetching logic to useSSFetchSSFilter hook.
 *
 * @typeParam T - Entity type.
 * @param props - Component props.
 * @param props.children - Child component to render with fetched data.
 * @param props.entityListType - Entity identifier.
 * @returns Rendered children with server-fetched data.
 */
export const SSFetchSSFilter = <T = unknown,>({
  children,
  entityListType,
}: EntityListStrategyProps<T>): JSX.Element => {
  const { data } = useSSFetchSSFilter<T>(entityListType);
  return <Fragment>{children({ data })}</Fragment>;
};

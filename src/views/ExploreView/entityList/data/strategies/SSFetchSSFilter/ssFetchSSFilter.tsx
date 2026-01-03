import { JSX } from "react";
import { useAdapter } from "./adapter/useAdapter";
import { DataSelectorProps } from "../../selector/types";
import { ServerDataContext } from "./provider/context";

/**
 * Server-side fetch and server-side filter strategy.
 *
 * Fetches entity data from the server with server-side filtering applied.
 * Delegates data fetching logic to useAdapter hook.
 *
 * Exposes facet and pagination information via ServerDataContext.
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
}: DataSelectorProps<T>): JSX.Element => {
  const { data, ...otherServerData } = useAdapter<T>(entityListType);
  return (
    <ServerDataContext.Provider value={otherServerData}>
      {children({ data })}
    </ServerDataContext.Provider>
  );
};

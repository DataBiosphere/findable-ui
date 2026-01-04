import { Fragment, JSX } from "react";
import { DataSelectorProps } from "../../selector/types";

/**
 * Client-side fetch and client-side filter strategy.
 *
 * This strategy assumes all entity data has already been resolved
 * (e.g. via static props) and performs no additional data fetching.
 *
 * The provided data is forwarded directly to the render prop (`children`)
 * for client-side filtering and presentation.
 *
 * @typeParam T - Entity type.
 * @param props - Component props.
 * @param props.children - Child component to render with the client-provided data.
 * @param props.data - Data to pass to child component.
 * @returns Rendered children with client-provided data.
 */
export const CSFetchCSFilter = <T = unknown,>({
  children,
  data,
}: DataSelectorProps<T>): JSX.Element => {
  if (!data) throw new Error("Client-side data required for CSFetchCSFilter.");
  return <Fragment>{children({ data, isFetching: false })}</Fragment>;
};

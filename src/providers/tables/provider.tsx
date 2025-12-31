import { JSX, ReactNode } from "react";
import { useTablesReducer } from "./hooks/UseTablesReducer/hook";
import { TablesContext } from "./context";
import { InitialArgs } from "./initializer/types";

/**
 * Provides table state and actions.
 *
 * @param props - Props.
 * @param props.children - Children.
 * @param props.initialArgs - Initial arguments.
 *
 * @returns A context provider wrapping the given children.
 */
export function TablesProvider({
  children,
  initialArgs,
}: {
  children: ReactNode;
  initialArgs: InitialArgs;
}): JSX.Element {
  const reducer = useTablesReducer(initialArgs);
  return (
    <TablesContext.Provider value={reducer}>{children}</TablesContext.Provider>
  );
}

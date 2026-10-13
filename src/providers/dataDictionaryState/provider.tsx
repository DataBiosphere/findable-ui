import { JSX, ReactNode } from "react";
import { DataDictionaryStateContext } from "./context";
import { useDataDictionaryReducer } from "./hooks/UseDataDictionaryReducer/hook";

/**
 * Provides the data dictionary state and dispatch through DataDictionaryStateContext.
 * @param props - Component props.
 * @param props.children - Children.
 * @returns The data dictionary state provider.
 */
export function DataDictionaryStateProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}): JSX.Element {
  const reducer = useDataDictionaryReducer();
  return (
    <DataDictionaryStateContext.Provider value={reducer}>
      {children}
    </DataDictionaryStateContext.Provider>
  );
}

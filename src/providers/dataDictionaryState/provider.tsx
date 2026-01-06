import { JSX, ReactNode } from "react";
import { DataDictionaryStateContext } from "./context";
import { useDataDictionaryReducer } from "./hooks/UseDataDictionaryReducer/hook";

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

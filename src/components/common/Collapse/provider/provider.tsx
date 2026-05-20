import { JSX, useCallback, useState } from "react";
import { CollapseContext } from "./context";
import { CollapseProviderProps } from "./types";

export function CollapseProvider({
  children,
  initialState = false,
}: CollapseProviderProps): JSX.Element {
  const [isIn, setIsIn] = useState<boolean>(initialState);

  const onChange = useCallback(() => setIsIn((prev) => !prev), []);

  return (
    <CollapseContext.Provider value={{ isIn, onChange }}>
      {typeof children === "function" ? children({ isIn, onChange }) : children}
    </CollapseContext.Provider>
  );
}

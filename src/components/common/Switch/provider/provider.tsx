import React, { ChangeEvent, useCallback, useState } from "react";
import { SwitchContext } from "./context";
import { SwitchProviderProps } from "./types";

export function SwitchProvider({ children }: SwitchProviderProps): JSX.Element {
  const [checked, setChecked] = useState<boolean>(false);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked),
    []
  );

  return (
    <SwitchContext.Provider value={{ checked, onChange }}>
      {typeof children === "function"
        ? children({ checked, onChange })
        : children}
    </SwitchContext.Provider>
  );
}

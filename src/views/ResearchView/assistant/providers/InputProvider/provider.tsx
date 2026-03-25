import { ChangeEvent, JSX, useCallback, useMemo, useState } from "react";
import { ChildrenProps } from "../../../../../components/types";
import { InputActionsContext, InputValueContext } from "./context";
import { InputActionsContextValue, InputElement } from "./types";

/**
 * Provides controlled input state for the assistant input field.
 * @param props - Component props.
 * @param props.children - Child components.
 * @returns The input provider wrapping children.
 */
export const InputProvider = ({ children }: ChildrenProps): JSX.Element => {
  const [value, setValue] = useState<string>("");

  const onChange = useCallback((e: ChangeEvent<InputElement>): void => {
    setValue(e.target.value);
  }, []);

  const actions = useMemo<InputActionsContextValue>(
    () => ({ onChange, setValue }),
    [onChange],
  );

  return (
    <InputActionsContext.Provider value={actions}>
      <InputValueContext.Provider value={{ value }}>
        {children}
      </InputValueContext.Provider>
    </InputActionsContext.Provider>
  );
};

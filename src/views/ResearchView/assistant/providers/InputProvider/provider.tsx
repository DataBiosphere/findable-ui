import { ChangeEvent, JSX, useCallback, useState } from "react";
import { ChildrenProps } from "../../../../../components/types";
import { InputContext } from "./context";

/**
 * Provides controlled input state for the assistant input field.
 * @param props - Component props.
 * @param props.children - Child components.
 * @returns The input provider wrapping children.
 */
export const InputProvider = ({ children }: ChildrenProps): JSX.Element => {
  const [value, setValue] = useState<string>("");

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  }, []);

  return (
    <InputContext.Provider value={{ onChange, setValue, value }}>
      {children}
    </InputContext.Provider>
  );
};

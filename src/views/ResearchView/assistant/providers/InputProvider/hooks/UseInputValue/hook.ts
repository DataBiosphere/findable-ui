import { useContext } from "react";
import { InputValueContext } from "../../context";
import { InputValueContextValue } from "../../types";

/**
 * Hook to access the controlled input value from InputProvider.
 * @returns The input value context value.
 */
export const useInputValue = (): InputValueContextValue => {
  const context = useContext(InputValueContext);
  if (!context) {
    throw new Error("useInputValue must be used within an InputProvider");
  }
  return context;
};

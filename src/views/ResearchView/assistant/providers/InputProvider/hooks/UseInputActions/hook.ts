import { useContext } from "react";
import { InputActionsContext } from "../../context";
import { InputActionsContextValue } from "../../types";

/**
 * Hook to access input actions (onChange, setValue) from InputProvider.
 * @returns The input actions context value.
 */
export const useInputActions = (): InputActionsContextValue => {
  const context = useContext(InputActionsContext);
  if (!context) {
    throw new Error("useInputActions must be used within an InputProvider");
  }
  return context;
};

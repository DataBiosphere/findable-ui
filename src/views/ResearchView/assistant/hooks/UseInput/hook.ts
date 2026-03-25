import { useContext } from "react";
import { InputContext } from "../../providers/InputProvider/context";
import { InputContextValue } from "../../providers/InputProvider/types";

/**
 * Hook to access the controlled input state from InputProvider.
 * @returns The input context value with value, onChange, and setValue.
 */
export const useInput = (): InputContextValue => {
  return useContext(InputContext);
};

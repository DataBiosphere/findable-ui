import { useContext } from "react";
import { ModeContext } from "./context";
import { ModeContextProps } from "./types";

/**
 * Returns the mode context.
 * @returns Mode context with value and onChange, or empty object if feature disabled.
 */
export const useMode = (): ModeContextProps => {
  return useContext(ModeContext);
};

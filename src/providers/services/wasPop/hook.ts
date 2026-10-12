import { useContext } from "react";
import { WasPopContext } from "./context";
import { WasPopContextProps } from "./types";

/**
 * Returns the wasPop context.
 * @returns The wasPop context.
 */
export const useWasPop = (): WasPopContextProps => {
  return useContext(WasPopContext);
};

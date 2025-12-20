import { useContext } from "react";
import { SwitchContext } from "./context";
import { SwitchContextProps } from "./types";

/**
 * Returns switch context.
 * @returns switch context.
 */
export const useSwitch = (): SwitchContextProps => {
  return useContext(SwitchContext);
};

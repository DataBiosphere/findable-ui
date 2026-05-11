import { useContext } from "react";
import { PopperContext } from "./context";
import { PopperContextProps } from "./types";

/**
 * Returns popper context.
 * @returns popper context.
 */
export const usePopper = (): PopperContextProps => {
  return useContext(PopperContext);
};

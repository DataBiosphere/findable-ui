import { useContext } from "react";
import { CollapseContext } from "./context";
import { CollapseContextProps } from "./types";

/**
 * Returns collapse context.
 * @returns collapse context.
 */
export const useCollapse = (): CollapseContextProps => {
  return useContext(CollapseContext);
};

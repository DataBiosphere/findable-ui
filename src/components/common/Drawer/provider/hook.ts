import { useContext } from "react";
import { DrawerContext } from "./context";
import { DrawerContextProps } from "./types";

/**
 * Returns drawer context.
 * @returns drawer context.
 */
export const useDrawer = (): DrawerContextProps => {
  return useContext(DrawerContext);
};

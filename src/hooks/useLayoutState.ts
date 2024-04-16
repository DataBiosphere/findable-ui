import { useContext } from "react";
import {
  LayoutStateContext,
  LayoutStateContextProps,
} from "../providers/layoutState";

/**
 * Returns layout state context.
 * @returns layout state context.
 */
export const useLayoutState = (): LayoutStateContextProps => {
  return useContext(LayoutStateContext);
};

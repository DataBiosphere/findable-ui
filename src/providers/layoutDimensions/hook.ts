import { useContext } from "react";
import { LayoutDimensionsContext } from "./context";
import { LayoutDimensionsContextProps } from "./types";

/**
 * Returns the layout dimensions context.
 * @returns The layout dimensions context.
 */
export const useLayoutDimensions = (): LayoutDimensionsContextProps => {
  return useContext<LayoutDimensionsContextProps>(LayoutDimensionsContext);
};

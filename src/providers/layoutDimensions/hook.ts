import { useContext } from "react";
import { LayoutDimensionsContext } from "./context";
import { LayoutDimensionsContextProps } from "./types";

export const useLayoutDimensions = (): LayoutDimensionsContextProps => {
  return useContext<LayoutDimensionsContextProps>(LayoutDimensionsContext);
};

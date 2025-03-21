import { createContext } from "react";
import { DEFAULT_LAYOUT_DIMENSIONS } from "./constants";
import { LayoutDimensionsContextProps } from "./types";

export const LayoutDimensionsContext =
  createContext<LayoutDimensionsContextProps>({
    dimensions: DEFAULT_LAYOUT_DIMENSIONS,
    footerRef: null,
    headerRef: null,
  });

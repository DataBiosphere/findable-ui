import { ReactNode } from "react";
import { ElementRect } from "../../hooks/useResizeObserver";

export interface LayoutDimensions {
  footer: Pick<ElementRect, "height">;
  header: Pick<ElementRect, "height">;
}

export interface LayoutDimensionsContextProps {
  dimensions: LayoutDimensions;
}

export interface LayoutDimensionsProviderProps {
  children: ReactNode | ReactNode[];
}

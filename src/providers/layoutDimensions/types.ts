import { ReactNode, RefObject } from "react";
import { ElementRect } from "../../hooks/useResizeObserver";

export interface LayoutDimensions {
  footer: Pick<ElementRect, "height">;
  header: Pick<ElementRect, "height">;
}

export interface LayoutDimensionsContextProps {
  dimensions: LayoutDimensions;
  footerRef: RefObject<HTMLElement> | null;
  headerRef: RefObject<HTMLElement> | null;
}

export interface LayoutDimensionsProviderProps {
  children: ReactNode | ReactNode[];
}

import { ReactNode, RefObject } from "react";
import { ElementRect } from "../../hooks/useResizeObserver";

/**
 * Header and footer heights.
 */
export interface LayoutDimensions {
  footer: Pick<ElementRect, "height">;
  header: Pick<ElementRect, "height">;
}

/**
 * Layout dimensions context.
 */
export interface LayoutDimensionsContextProps {
  dimensions: LayoutDimensions;
  footerRef: RefObject<HTMLElement | null>;
  headerRef: RefObject<HTMLElement | null>;
}

/**
 * Props for the LayoutDimensionsProvider component.
 */
export interface LayoutDimensionsProviderProps {
  children: ReactNode | ReactNode[];
}

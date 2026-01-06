import { JSX, useRef } from "react";
import {
  getBorderBoxSizeHeight,
  useResizeObserver,
} from "../../hooks/useResizeObserver";
import { LayoutDimensionsContext } from "./context";
import { LayoutDimensions, LayoutDimensionsProviderProps } from "./types";

export const LayoutDimensionsProvider = ({
  children,
}: LayoutDimensionsProviderProps): JSX.Element => {
  const footerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const footerRect = useResizeObserver(footerRef, getBorderBoxSizeHeight);
  const headerRect = useResizeObserver(headerRef, getBorderBoxSizeHeight);

  const dimensions: LayoutDimensions = {
    footer: { height: footerRect?.height ?? 0 },
    header: { height: headerRect?.height ?? 0 },
  };

  return (
    <LayoutDimensionsContext.Provider
      value={{ dimensions, footerRef, headerRef }}
    >
      {children}
    </LayoutDimensionsContext.Provider>
  );
};

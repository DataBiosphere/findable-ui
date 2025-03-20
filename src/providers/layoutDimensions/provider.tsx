import React, { useEffect, useRef } from "react";
import { SELECTOR } from "../../common/selectors";
import {
  getBorderBoxSizeHeight,
  useResizeObserver,
} from "../../hooks/useResizeObserver";
import { LayoutDimensionsContext } from "./context";
import { LayoutDimensions, LayoutDimensionsProviderProps } from "./types";

export const LayoutDimensionsProvider = ({
  children,
}: LayoutDimensionsProviderProps): JSX.Element => {
  const footerRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const footerRect = useResizeObserver(footerRef, getBorderBoxSizeHeight);
  const headerRect = useResizeObserver(headerRef, getBorderBoxSizeHeight);

  useEffect(() => {
    footerRef.current = document.getElementById(SELECTOR.FOOTER);
    headerRef.current = document.getElementById(SELECTOR.HEADER);
  }, []);

  const dimensions: LayoutDimensions = {
    footer: { height: footerRect?.height ?? 0 },
    header: { height: headerRect?.height ?? 0 },
  };

  return (
    <LayoutDimensionsContext.Provider value={{ dimensions }}>
      {children}
    </LayoutDimensionsContext.Provider>
  );
};

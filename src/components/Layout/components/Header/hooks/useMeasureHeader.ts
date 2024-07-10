import { RefObject, useEffect, useRef } from "react";
import { useLayoutState } from "../../../../../hooks/useLayoutState";
import {
  getBorderBoxSizeHeight,
  useResizeObserver,
} from "../../../../../hooks/useResizeObserver";
import { LayoutActionKind } from "../../../../../providers/layoutState";

export interface UseMeasureHeader {
  headerRef: RefObject<HTMLElement>;
}

export const useMeasureHeader = (): UseMeasureHeader => {
  const { layoutDispatch } = useLayoutState();
  const headerRef = useRef<HTMLElement>(null);
  const { height } = useResizeObserver(headerRef, getBorderBoxSizeHeight) || {};

  // Updates layout state header height.
  useEffect(() => {
    if (!height) return;
    layoutDispatch({
      payload: height,
      type: LayoutActionKind.UpdateHeaderHeight,
    });
  }, [height, layoutDispatch]);

  return { headerRef };
};

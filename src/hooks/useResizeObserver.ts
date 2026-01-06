import { RefObject, useCallback, useEffect, useRef, useState } from "react";

export type ElementRect = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
};

/**
 * Element resizing and repositioning observer.
 * @param ref - element to be observed for changes to its size or position.
 * @param onResizeFn - action to be performed when the observed element is resized or repositioned.
 * @param shouldObserve - boolean flag to determine if the observer should be active.
 * @returns Element size and position properties for the given element.
 */
export function useResizeObserver(
  ref: RefObject<HTMLElement>,
  onResizeFn: (entries: ResizeObserverEntry[]) => Partial<ElementRect>,
  shouldObserve: boolean = true,
): Partial<ElementRect> | undefined {
  const [elementRect, setElementRect] = useState<Partial<ElementRect>>();
  const observerRef = useRef<ResizeObserver>();

  // Observed element is resized or repositioned - set state elementRect with the element's new dimensions or position.
  const onResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (entries && entries.length > 0) {
        const nextElementRect = onResizeFn(entries);
        setElementRect((elRect) => getNextElementRect(elRect, nextElementRect));
      }
    },
    [onResizeFn],
  );

  // Creates a new ResizeObserver object which can be used to report changes to an "observed" element's dimensions or position.
  useEffect(() => {
    if (!ref.current) return;
    if (!shouldObserve) return;
    observerRef.current = new ResizeObserver(onResize);
    const observer = observerRef.current;
    const observedEl = ref.current;
    observer.observe(observedEl);
    return (): void => {
      observer.unobserve(observedEl);
    };
  }, [onResize, ref, shouldObserve]);

  return elementRect;
}

/**
 * Return's the observed element's border box size.
 * @param entries - Resize observer entries.
 * @returns observed element's border box size.
 */
export function getBorderBoxSize(
  entries: ResizeObserverEntry[],
): Partial<ElementRect> {
  const entry = entries[0]; // grab the first entry; observing a single element.
  const borderBoxSize = entry.borderBoxSize[0];
  return {
    height: borderBoxSize.blockSize,
    width: borderBoxSize.inlineSize,
  };
}

/**
 * Return's the observed element's border box height.
 * @param entries - Resize observer entries.
 * @returns observed element's border box height.
 */
export function getBorderBoxSizeHeight(
  entries: ResizeObserverEntry[],
): Partial<ElementRect> {
  const { height } = getBorderBoxSize(entries);
  return { height };
}

/**
 * Return's the observed element's size and position properties.
 * @param entries - Resize observer entries.
 * @returns the observed element's size and position properties.
 */
export function getContentRect(entries: ResizeObserverEntry[]): ElementRect {
  const entry = entries[0]; // grab the first entry; observing a single element
  const contentRect = entry.contentRect.toJSON();
  return {
    ...contentRect,
  };
}

/**
 * Return's the next observed element's size and position properties.
 * @param elementRect - Current observed element's rect properties.
 * @param nextElementRect - Next observed element's rect properties.
 * @returns the next observed element's size and position properties.
 */
export function getNextElementRect(
  elementRect: Partial<ElementRect> | undefined,
  nextElementRect: Partial<ElementRect> | undefined,
): Partial<ElementRect> | undefined {
  if (!nextElementRect) return elementRect;
  for (const [key, value] of Object.entries(nextElementRect)) {
    if (elementRect?.[key as keyof ElementRect] !== value) {
      return { ...elementRect, ...nextElementRect };
    }
  }
  return elementRect;
}

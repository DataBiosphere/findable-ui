import { useLayoutEffect, useRef, useState } from "react";
import type { CSSPropHyphen } from "../../../../hooks/useHtmlStyle/types";
import type { UseLayoutHeight } from "./types";
import { observeHeight } from "./utils";

/**
 * Measures an element's height and sets it on the HTML element as a CSS custom
 * property, for styles that size or pin around it. The property is written
 * from the resize observer, before paint and without re-rendering, and is
 * removed on unmount so styles fall back to their default.
 * @param property - Custom property to set, e.g. `--header-height`.
 * @returns The ref to attach to the measured element, and whether it has been measured.
 */
export const useLayoutHeight = <T extends HTMLElement = HTMLElement>(
  property: CSSPropHyphen,
): UseLayoutHeight<T> => {
  const ref = useRef<T>(null);
  const [isMeasured, setIsMeasured] = useState(false);

  useLayoutEffect(
    () => observeHeight(ref.current, property, setIsMeasured),
    [property],
  );

  return { isMeasured, ref };
};

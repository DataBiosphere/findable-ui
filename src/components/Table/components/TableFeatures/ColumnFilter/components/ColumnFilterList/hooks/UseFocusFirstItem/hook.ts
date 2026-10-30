import { RefObject, useEffect, useRef } from "react";
import { focusFirstItem } from "./utils";

/**
 * Moves focus to the list's first item when the list mounts, i.e. when its panel opens, so keyboard users land in the panel; the page does not scroll.
 * @returns Ref to attach to the list.
 */
export const useFocusFirstItem = (): RefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    focusFirstItem(ref.current);
  }, []);
  return ref;
};

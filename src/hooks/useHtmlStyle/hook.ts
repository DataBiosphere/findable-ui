import { useLayoutEffect } from "react";
import { CSSPropHyphen } from "./types";

export const useHtmlStyle = (
  property: CSSPropHyphen,
  value: string | null
): void => {
  useLayoutEffect(() => {
    // Get the HTML element.
    const el = document.documentElement;

    // Get the previous value.
    const previousValue = el.style.getPropertyValue(property);

    if (value !== null) el.style.setProperty(property, value);

    return (): void => {
      // Restore or remove property value on the HTML element.
      if (previousValue) el.style.setProperty(property, previousValue);
      else el.style.removeProperty(property);
    };
  }, [property, value]);
};

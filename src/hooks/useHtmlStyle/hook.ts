import { useLayoutEffect } from "react";
import { CSSPropHyphen } from "./types";

/**
 * Sets a CSS property on the html element; on cleanup, restores the previous
 * value or removes the property.
 * @param property - CSS property, hyphenated.
 * @param value - Value to set; null sets nothing.
 */
export const useHtmlStyle = (
  property: CSSPropHyphen,
  value: string | null,
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

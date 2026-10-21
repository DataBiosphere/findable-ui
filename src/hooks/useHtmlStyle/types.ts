import type * as CSS from "csstype";

/**
 * Hyphenated CSS property name, or a custom property.
 */
export type CSSPropHyphen = keyof CSS.PropertiesHyphen | `--${string}`;

import type * as CSS from "csstype";

/**
 * Hyphenated CSS property name, or a custom property.
 * Custom properties are admitted because they inherit: a descendant that knows
 * a value can declare it on the HTML element for an ancestor to consume, which
 * a real property could not do.
 */
export type CSSPropHyphen = keyof CSS.PropertiesHyphen | `--${string}`;

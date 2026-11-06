/**
 * Lists the selectors of the style rules that set the given declaration.
 * @param property - CSS property, e.g. "background-color".
 * @param value - Value the rule sets the property to.
 * @returns Selector text of each matching rule.
 */
export function getSelectorsSetting(property: string, value: string): string[] {
  return getStyleRules()
    .filter((rule) => rule.style.getPropertyValue(property) === value)
    .map((rule) => rule.selectorText);
}

/**
 * Lists the top-level style rules Emotion has inserted into the document.
 * @returns Each style rule not nested in an at-rule such as `@media`.
 */
export function getStyleRules(): CSSStyleRule[] {
  return Array.from(document.styleSheets).flatMap((sheet) =>
    Array.from(sheet.cssRules).filter(
      (rule): rule is CSSStyleRule => rule instanceof CSSStyleRule,
    ),
  );
}

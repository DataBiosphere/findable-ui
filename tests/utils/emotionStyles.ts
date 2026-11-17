/**
 * One CSS rule as Emotion wrote it: its selector, the media query it sits in, if any, and its declarations in source order.
 */
interface CssRule {
  declarations: [string, string][];
  media: string | null;
  selector: string;
}

/**
 * Longhand properties each shorthand resets, as property names or name prefixes.
 * A shorthand written after its longhands overrides them, so the longhands are dropped.
 * `border` doesn't reset `border-radius`, so names containing "radius" are never dropped.
 */
const SHORTHAND_LONGHANDS: Record<string, string[]> = {
  background: ["background-"],
  border: ["border-"],
  flex: ["flex-basis", "flex-grow", "flex-shrink"],
  font: ["font-", "line-height"],
  margin: ["margin-"],
  padding: ["padding-"],
  "text-decoration": ["text-decoration-"],
  transition: ["transition-"],
};

/**
 * Rules passed to `CSSStyleSheet.insertRule`, parsed from the raw strings before jsdom parses them.
 */
const INSERTED_RULES: CssRule[] = [];

/**
 * Resolved styles keyed by selector, with the element's Emotion class replaced by `&`
 * (e.g. `&`, `&:hover`, `& .MuiButton-icon .MuiSvgIcon-root`, `@media (hover: none) &:hover`).
 * Each key maps CSS properties to the value that wins in source order; longhands a later shorthand overrides are left out.
 */
export type ResolvedStyles = Record<string, Record<string, string>>;

/**
 * Applies declarations in source order: each replaces any earlier value for its
 * property, and a shorthand also removes the earlier longhands it resets.
 * @param styles - Property values so far, if any.
 * @param declarations - Property and value pairs in source order.
 * @returns The property values after the declarations apply.
 */
function applyDeclarations(
  styles: Record<string, string> = {},
  declarations: [string, string][],
): Record<string, string> {
  const applied = { ...styles };
  for (const [property, value] of declarations) {
    const longhands = SHORTHAND_LONGHANDS[property] ?? [];
    for (const name of Object.keys(applied)) {
      if (name.includes("radius")) continue;
      if (longhands.some((longhand) => name.startsWith(longhand))) {
        delete applied[name];
      }
    }
    applied[property] = value;
  }
  return applied;
}

/**
 * Returns the styles Emotion wrote for an element's own classes, keyed by selector.
 * Emotion merges every style for a styled element into one class, so the last
 * value written for a selector and property is the one that applies.
 * @param element - Element styled by Emotion.
 * @returns Resolved styles keyed by selector, sorted by selector and property.
 */
export function getEmotionStyles(element: Element): ResolvedStyles {
  const classNames = [...element.classList].filter((name) =>
    name.startsWith("css-"),
  );
  const resolved: ResolvedStyles = {};
  for (const rule of INSERTED_RULES) {
    for (const selector of rule.selector.split(",")) {
      const key = toKey(selector.trim(), classNames, rule.media);
      if (key === null) continue;
      resolved[key] = applyDeclarations(resolved[key], rule.declarations);
    }
  }
  return sortStyles(resolved);
}

/**
 * Splits a declaration block into property and value pairs.
 * @param block - Declarations, e.g. `color:red;padding:0`.
 * @returns Property and value pairs in source order.
 */
function parseDeclarations(block: string): [string, string][] {
  return block
    .split(";")
    .map((declaration) => declaration.trim())
    .filter(Boolean)
    .map((declaration) => {
      const colon = declaration.indexOf(":");
      return [
        declaration.slice(0, colon).trim(),
        declaration.slice(colon + 1).trim(),
      ];
    });
}

/**
 * Parses minified CSS into rules, descending into `@media` blocks.
 * @param css - CSS text.
 * @param media - Enclosing media query, if any.
 * @param rules - Rules collected so far; parsed rules are appended.
 */
function parseRules(css: string, media: string | null, rules: CssRule[]): void {
  let start = 0;
  while (start < css.length) {
    const open = css.indexOf("{", start);
    if (open === -1) return;
    let depth = 1;
    let close = open + 1;
    while (depth > 0) {
      if (css[close] === "{") depth++;
      if (css[close] === "}") depth--;
      close++;
    }
    const prelude = css.slice(start, open).trim();
    const body = css.slice(open + 1, close - 1);
    if (prelude.startsWith("@media")) {
      parseRules(body, prelude, rules);
    } else if (!prelude.startsWith("@")) {
      rules.push({
        declarations: parseDeclarations(body),
        media,
        selector: prelude,
      });
    }
    start = close;
  }
}

/**
 * Records every rule Emotion inserts from now on. Emotion inserts rules with
 * `CSSStyleSheet.insertRule`, and jsdom drops values it can't parse, such as
 * `var()` in colour properties, so each raw rule string is parsed and kept instead.
 */
export function recordInsertedRules(): void {
  const insertRule = CSSStyleSheet.prototype.insertRule;
  CSSStyleSheet.prototype.insertRule = function (
    rule: string,
    index?: number,
  ): number {
    parseRules(rule, null, INSERTED_RULES);
    return insertRule.call(this, rule, index);
  };
}

/**
 * Sorts selectors and properties, so a snapshot of the result is stable.
 * @param styles - Resolved styles.
 * @returns The same styles with sorted keys.
 */
function sortStyles(styles: ResolvedStyles): ResolvedStyles {
  return Object.fromEntries(
    Object.keys(styles)
      .sort()
      .map((key) => [
        key,
        Object.fromEntries(
          Object.entries(styles[key]).sort(([a], [b]) => a.localeCompare(b)),
        ),
      ]),
  );
}

/**
 * Turns a selector that starts with one of the element's Emotion classes into a key,
 * replacing that class with `&` and prefixing the media query, if any.
 * @param selector - One selector from a rule's selector list.
 * @param classNames - The element's Emotion class names.
 * @param media - Enclosing media query, if any.
 * @returns The key, or null when the selector doesn't start with one of the classes.
 */
function toKey(
  selector: string,
  classNames: string[],
  media: string | null,
): string | null {
  for (const className of classNames) {
    const prefix = `.${className}`;
    if (!selector.startsWith(prefix)) continue;
    const next = selector.charAt(prefix.length);
    if (/[\w-]/.test(next)) continue;
    const key = `&${selector.slice(prefix.length)}`;
    return media ? `${media} ${key}` : key;
  }
  return null;
}

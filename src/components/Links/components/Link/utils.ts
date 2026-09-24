import type { NonSpanProps } from "./types";

/**
 * Merges class name strings into a single de-duplicated class list.
 * @param classNames - Class name strings to merge.
 * @returns The merged class name string, or undefined when no classes exist.
 */
export function mergeClassNames(
  ...classNames: (string | undefined)[]
): string | undefined {
  const mergedClassNames = [
    ...new Set(
      classNames.flatMap(
        (className) => className?.split(/\s+/).filter(Boolean) || [],
      ),
    ),
  ].join(" ");
  return mergedClassNames || undefined;
}

/**
 * Removes anchor-only and MUI Link-only props from the props spread onto the
 * invalid-URL fallback span, keeping everything that is valid on a span
 * (`ref`, `sx`, `style`, `id`, `aria-*`, `data-*` and handlers injected by
 * wrappers such as Tooltip).
 * @param props - Remaining Link props.
 * @returns The props without non-span attributes.
 */
export function omitNonSpanProps<P extends NonSpanProps>(
  props: P,
): Omit<P, keyof NonSpanProps> {
  const {
    classes: _classes,
    download: _download,
    href: _href,
    hrefLang: _hrefLang,
    media: _media,
    ping: _ping,
    referrerPolicy: _referrerPolicy,
    rel: _rel,
    type: _type,
    TypographyClasses: _TypographyClasses,
    underline: _underline,
    ...spanProps
  } = props;
  return spanProps;
}

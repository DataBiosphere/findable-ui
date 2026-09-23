import type { NonSpanProps } from "./types";

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

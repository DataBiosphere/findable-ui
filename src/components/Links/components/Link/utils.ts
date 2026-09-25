import type { AnchorOnlyProps } from "./types";

/**
 * Removes anchor-only attributes from the props spread onto the invalid-URL
 * fallback span, keeping everything that is valid on a span (`ref`, `sx`,
 * `style`, `id`, `aria-*`, `data-*` and handlers injected by wrappers such as
 * Tooltip).
 * @param props - Remaining Link props.
 * @returns The props without anchor-only attributes.
 */
export function omitAnchorOnlyProps<P extends AnchorOnlyProps>(
  props: P,
): Omit<P, keyof AnchorOnlyProps> {
  const {
    download: _download,
    href: _href,
    hrefLang: _hrefLang,
    media: _media,
    ping: _ping,
    referrerPolicy: _referrerPolicy,
    rel: _rel,
    type: _type,
    ...spanProps
  } = props;
  return spanProps;
}

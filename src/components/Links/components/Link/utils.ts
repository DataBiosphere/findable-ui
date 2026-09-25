import type { TypographyProps } from "../../../common/Typography/common/entities";
import type { AnchorOnlyProps, LinkOnlyProps } from "./types";

type FallbackClasses = NonNullable<NonNullable<TypographyProps>["classes"]>;
type FallbackProps<P> = Omit<P, keyof AnchorOnlyProps | keyof LinkOnlyProps> & {
  classes?: FallbackClasses;
};

/**
 * Returns the props that should reach the invalid-URL fallback span.
 * @param props - Remaining Link props.
 * @param typographyProps - Typography props supplied to Link.
 * @returns The fallback-safe span props, including the merged Typography class map.
 */
export function getFallbackProps<P extends AnchorOnlyProps & LinkOnlyProps>(
  props: P,
  typographyProps?: TypographyProps,
): FallbackProps<P> {
  const {
    classes,
    TypographyClasses,
    underline: _underline,
    ...spanProps
  } = omitAnchorOnlyProps(props);
  const fallbackClasses = {
    ...TypographyClasses,
    ...typographyProps?.classes,
    root: mergeClassNames(
      classes?.root,
      TypographyClasses?.root,
      typographyProps?.classes?.root,
    ),
  };
  return {
    ...spanProps,
    ...(Object.values(fallbackClasses).some(Boolean)
      ? { classes: fallbackClasses }
      : undefined),
  } as FallbackProps<P>;
}

/**
 * Merges class name values into a single className string.
 * @param classNames - Class names to merge.
 * @returns The merged className, or undefined when no class names are provided.
 */
export function mergeClassNames(
  ...classNames: (string | undefined)[]
): string | undefined {
  const mergedClassName = classNames.filter(Boolean).join(" ");
  return mergedClassName || undefined;
}

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

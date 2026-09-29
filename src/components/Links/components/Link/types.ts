import type { LinkProps as MLinkProps } from "@mui/material";
import type { AnchorHTMLAttributes } from "react";
import type { TypographyProps } from "../../../common/Typography/common/entities";

/**
 * Attributes that only mean something on an anchor, and so must not reach the
 * invalid-URL fallback span. `rel` is typed on every element by React, but the
 * HTML spec only permits it on `a`, `area`, `form` and `link`.
 */
export type AnchorOnlyProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  | "download"
  | "href"
  | "hrefLang"
  | "media"
  | "ping"
  | "referrerPolicy"
  | "rel"
  | "type"
>;

/**
 * Typography classes that may be applied to the invalid-URL fallback span.
 */
export type FallbackClasses = NonNullable<
  NonNullable<TypographyProps>["classes"]
>;

/**
 * Props that may safely reach the invalid-URL fallback span.
 */
export type FallbackProps<P> = Omit<
  Omit<P, keyof AnchorOnlyProps>,
  keyof LinkOnlyProps
> & {
  classes?: FallbackClasses;
};

/**
 * Link props that need custom handling before reaching the invalid-URL fallback span.
 */
export type LinkOnlyProps = Pick<
  MLinkProps,
  "TypographyClasses" | "classes" | "underline"
>;

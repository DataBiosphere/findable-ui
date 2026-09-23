import type { LinkProps as MLinkProps } from "@mui/material";
import type { AnchorHTMLAttributes } from "react";

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
 * Props that are invalid on the fallback span rendered for invalid URLs.
 */
export type NonSpanProps = AnchorOnlyProps &
  Pick<MLinkProps, "classes" | "TypographyClasses" | "underline">;

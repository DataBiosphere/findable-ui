import React, { AnchorHTMLAttributes, ClassAttributes } from "react";
import { Link } from "../../../Links/components/Link/link";
import { BaseComponentProps } from "../../../types";

/**
 * rehype-sanitize's default schema allows only a limited set of attributes on <a> elements:
 * - aria-*
 * - className
 * - data-footnote-backref
 * - data-footnote-ref
 * - href
 *
 * By default, attributes such as:
 * - download
 * - rel
 * - target
 * are not permitted and will be stripped from anchor tags during sanitization.
 *
 * Note: This component currently does not support these excluded attributes.
 */

export const Anchor = (
  props: BaseComponentProps &
    ClassAttributes<HTMLAnchorElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>
): JSX.Element => {
  return (
    <Link
      className={props.className}
      label={props.children}
      url={props.href || ""}
    />
  );
};

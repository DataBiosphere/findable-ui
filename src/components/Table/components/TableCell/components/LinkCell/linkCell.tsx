import { LinkProps, Link as MLink, Typography } from "@mui/material";
import { CellContext, RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { isValidUrl } from "../../../../../../common/utils";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { isClientSideNavigation } from "../../../../../Links/common/utils";
import type { BaseComponentProps } from "../../../../../types";
import { getComponent, getRelAttribute, getTargetAttribute } from "./utils";

/**
 * Link cell, rendering a link from the cell value's link props.
 * Internal (root-relative or hash) hrefs use client-side navigation and open in the same tab by default; external URLs open in a new tab by default.
 * Clicking the link does not propagate to parent components, unless the link props include an onClick, which replaces that handler.
 * An invalid href renders the children as plain text instead, without the color, rel, target and underline link props.
 * @param props - Component props, the TanStack cell context plus a class name.
 * @param props.className - Class name applied to the link or text.
 * @param props.getValue - Function returning the cell value, the link props.
 * @returns The link or text, or null when the cell value is falsy.
 */
export const LinkCell = <
  T extends RowData,
  TValue extends LinkProps = LinkProps,
>({
  className,
  getValue,
}: BaseComponentProps & CellContext<T, TValue>): JSX.Element | null => {
  const props = getValue();
  if (!props) return null;
  const {
    children,
    color,
    href = "",
    rel,
    target,
    underline,
    ...linkProps
  } = props;

  // Determine if the href should use client-side navigation.
  const isClientSide = isClientSideNavigation(href);

  // Determine if the href is valid.
  const isValid = isClientSide || isValidUrl(href);

  // If the href is invalid, return a Typography component.
  if (!isValid)
    return (
      <Typography
        className={className}
        color={TYPOGRAPHY_PROPS.COLOR.INHERIT}
        component="span"
        variant={TYPOGRAPHY_PROPS.VARIANT.INHERIT}
        {...linkProps}
      >
        {children}
      </Typography>
    );

  // If the href is valid, return a Link component.
  return (
    <MLink
      className={className}
      color={color}
      component={getComponent(href, isClientSide)}
      href={href}
      /*
       * Prevents click events from bubbling up to parent components
       * (such as CardActionArea or Accordion) when the link is activated.
       */
      onClick={(e) => e.stopPropagation()}
      rel={getRelAttribute(rel, isClientSide)}
      target={getTargetAttribute(target, isClientSide)}
      underline={underline}
      {...linkProps}
    >
      {children}
    </MLink>
  );
};

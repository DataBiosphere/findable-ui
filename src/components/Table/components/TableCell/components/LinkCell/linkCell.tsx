import { LinkProps, Link as MLink, Typography } from "@mui/material";
import { CellContext, RowData } from "@tanstack/react-table";
import { BaseComponentProps } from "components/types";
import { JSX } from "react";
import { isValidUrl } from "../../../../../../common/utils";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { isClientSideNavigation } from "../../../../../Links/common/utils";
import { getComponent, getRelAttribute, getTargetAttribute } from "./utils";

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

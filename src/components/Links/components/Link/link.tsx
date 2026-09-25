import {
  Link as MLink,
  LinkProps as MLinkProps,
  Typography as MTypography,
} from "@mui/material";
import NLink from "next/link";
import { JSX, ReactNode } from "react";
import { isValidUrl } from "../../../../common/utils";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { CopyToClipboard } from "../../../common/CopyToClipboard/copyToClipboard";
import { TypographyProps } from "../../../common/Typography/common/entities";
import { BaseComponentProps } from "../../../types";
import { ANCHOR_TARGET, REL_ATTRIBUTE, Url } from "../../common/entities";
import {
  isClientSideNavigation,
  isURLObjectWithHrefAndQuery,
  isURLString,
} from "../../common/utils";
import { ExploreViewLink } from "./components/ExploreViewLink/exploreViewLink";
import { omitAnchorOnlyProps } from "./utils";

export interface LinkProps
  extends BaseComponentProps, Omit<MLinkProps, "children" | "component"> {
  copyable?: boolean;
  label: ReactNode /* link label may be an element */;
  target?: ANCHOR_TARGET;
  TypographyProps?: TypographyProps;
  url: Url /* url specified as UrlObject with href and query defined, and is currently only used for internal links */;
}

export const Link = ({
  className,
  copyable = false,
  label,
  noWrap = false,
  onClick,
  target,
  TypographyProps,
  url,
  ...props /* Spread props to allow for specific MuiLink prop overrides. */
}: LinkProps): JSX.Element => {
  if (isURLObjectWithHrefAndQuery(url)) {
    /* Internal navigation - explore link */
    return (
      <ExploreViewLink
        className={TypographyProps?.className ?? className}
        label={label}
        onClick={onClick}
        target={target}
        url={url}
      />
    );
  }
  if (isURLString(url)) {
    if (isClientSideNavigation(url)) {
      /* Client-side navigation */
      return (
        <>
          <MLink
            className={className}
            component={NLink}
            href={url}
            noWrap={noWrap}
            onClick={onClick}
            rel={REL_ATTRIBUTE.NO_OPENER}
            target={target || ANCHOR_TARGET.SELF}
            {...TypographyProps}
            {...props}
          >
            {label}
          </MLink>
          {copyable && <CopyToClipboard copyStr={url} />}
        </>
      );
    }
    if (isValidUrl(url)) {
      /* External navigation */
      return (
        <>
          <MLink
            className={className}
            href={url}
            noWrap={noWrap}
            onClick={onClick}
            rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
            target={target || ANCHOR_TARGET.BLANK}
            {...TypographyProps}
            {...props}
          >
            {label}
          </MLink>
          {copyable && <CopyToClipboard copyStr={url} />}
        </>
      );
    }
  }
  /* Invalid URL - renders a span, so anchor-only attributes are omitted. */
  const {
    classes,
    TypographyClasses,
    underline: _underline,
    ...spanProps
  } = omitAnchorOnlyProps(props);
  const { classes: typographyClasses, ...fallbackTypographyProps } =
    TypographyProps ?? {};
  const fallbackClassName =
    [classes?.root, fallbackTypographyProps.className ?? className]
      .filter(Boolean)
      .join(" ") || undefined;
  const fallbackTypographyClasses =
    typographyClasses || TypographyClasses
      ? {
          ...TypographyClasses,
          ...typographyClasses,
        }
      : undefined;
  return (
    <MTypography
      component="span"
      noWrap={noWrap}
      onClick={onClick}
      variant={TYPOGRAPHY_PROPS.VARIANT.INHERIT}
      {...fallbackTypographyProps}
      {...spanProps}
      classes={fallbackTypographyClasses}
      className={fallbackClassName}
    >
      {label}
    </MTypography>
  );
};

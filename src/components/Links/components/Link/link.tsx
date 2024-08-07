import {
  Link as MLink,
  LinkProps as MLinkProps,
  Typography as MTypography,
} from "@mui/material";
import NLink from "next/link";
import React, { ReactNode } from "react";
import { isValidUrl } from "../../../../common/utils";
import { CopyToClipboard } from "../../../common/CopyToClipboard/copyToClipboard";
import { TypographyProps } from "../../../common/Typography/common/entities";
import { ANCHOR_TARGET, REL_ATTRIBUTE, Url } from "../../common/entities";
import {
  isClientSideNavigation,
  isURLObjectWithHrefAndQuery,
  isURLString,
} from "../../common/utils";
import { ExploreViewLink } from "./components/ExploreViewLink/exploreViewLink";

export interface LinkProps {
  className?: string;
  copyable?: boolean;
  label: ReactNode /* link label may be an element */;
  noWrap?: MLinkProps["noWrap"];
  onClick?: () => void;
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
}: LinkProps): JSX.Element => {
  if (isURLObjectWithHrefAndQuery(url)) {
    /* Internal navigation - explore link */
    return (
      <ExploreViewLink
        className={className}
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
          <NLink href={url} legacyBehavior passHref>
            <MLink
              className={className}
              rel={REL_ATTRIBUTE.NO_OPENER}
              noWrap={noWrap}
              target={target || ANCHOR_TARGET.SELF}
              onClick={onClick}
              {...TypographyProps}
            >
              {label}
            </MLink>
          </NLink>
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
          >
            {label}
          </MLink>
          {copyable && <CopyToClipboard copyStr={url} />}
        </>
      );
    }
  }
  /* Invalid URL */
  return (
    <MTypography component="span" variant="inherit" {...TypographyProps}>
      {label}
    </MTypography>
  );
};

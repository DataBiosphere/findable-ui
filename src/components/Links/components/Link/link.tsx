import { Link as MLink, LinkProps as MLinkProps } from "@mui/material";
import NLink from "next/link";
import React, { ReactNode } from "react";
import { isValidUrl } from "../../../../common/utils";
import { CopyToClipboard } from "../../../common/CopyToClipboard/copyToClipboard";
import { ANCHOR_TARGET, Url } from "../../common/entities";
import {
  isClientSideNavigation,
  isURLObject,
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
  url: Url /* url specified as UrlObject is currently only used for internal links */;
}

export const Link = ({
  className,
  copyable = false,
  label,
  noWrap = false,
  onClick,
  target,
  url,
}: LinkProps): JSX.Element => {
  if (isURLObject(url)) {
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
              rel="noopener"
              noWrap={noWrap}
              target={target || ANCHOR_TARGET.SELF}
              onClick={onClick}
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
            rel="noopener noreferrer"
            target={target || ANCHOR_TARGET.BLANK}
          >
            {label}
          </MLink>
          {copyable && <CopyToClipboard copyStr={url} />}
        </>
      );
    }
  }
  /* Invalid URL */
  return <>{label}</>;
};

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
import { getFallbackProps, mergeClassNames } from "./utils";

/**
 * Props for the Link component.
 */
export interface LinkProps
  extends BaseComponentProps, Omit<MLinkProps, "children" | "component"> {
  copyable?: boolean;
  label: ReactNode /* link label may be an element */;
  target?: ANCHOR_TARGET;
  TypographyProps?: TypographyProps;
  url: Url /* url specified as UrlObject with href and query defined, and is currently only used for internal links */;
}

/**
 * Link for an explore view, a client-side route or an external URL. An invalid
 * URL renders the label as plain text.
 * @param props - Component props; other props are passed to the MUI link, and ignored for explore URLs along with copyable, noWrap and TypographyProps.
 * @param props.className - Class name applied to the link.
 * @param props.copyable - Whether to show a copy to clipboard button. Defaults to false.
 * @param props.label - Link label.
 * @param props.noWrap - Whether the label is kept on one line. Defaults to false.
 * @param props.onClick - Invoked on click; not called for an invalid URL.
 * @param props.target - Link target. Defaults to the same tab for internal links and a new tab for external ones.
 * @param props.TypographyProps - Typography props for the link.
 * @param props.url - URL, or an explore URL object.
 * @returns The link.
 */
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
          <MLink
            component={NLink}
            href={url}
            noWrap={noWrap}
            rel={REL_ATTRIBUTE.NO_OPENER}
            target={target || ANCHOR_TARGET.SELF}
            {...TypographyProps}
            {...props}
            className={mergeClassNames(className, TypographyProps?.className)}
            /* Link's own onClick wins over a TypographyProps one. */
            onClick={onClick ?? TypographyProps?.onClick}
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
            href={url}
            noWrap={noWrap}
            rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
            target={target || ANCHOR_TARGET.BLANK}
            {...TypographyProps}
            {...props}
            className={mergeClassNames(className, TypographyProps?.className)}
            /* Link's own onClick wins over a TypographyProps one. */
            onClick={onClick ?? TypographyProps?.onClick}
          >
            {label}
          </MLink>
          {copyable && <CopyToClipboard copyStr={url} />}
        </>
      );
    }
  }
  /* Invalid URL - renders a Typography span. Anchor-only props and `underline` are
   * omitted, and Link class props are remapped onto Typography classes. Link's own
   * `onClick` is intentionally not forwarded, so parent click handling still works.
   * Handlers passed via `TypographyProps` still apply, as on main. */
  return (
    <MTypography
      component="span"
      noWrap={noWrap}
      variant={TYPOGRAPHY_PROPS.VARIANT.INHERIT}
      {...TypographyProps}
      {...getFallbackProps(props, TypographyProps)}
      className={mergeClassNames(className, TypographyProps?.className)}
    >
      {label}
    </MTypography>
  );
};

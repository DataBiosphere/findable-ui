import { Link as MLink, LinkProps as MLinkProps } from "@mui/material";
import NLink from "next/link";
import React, { ReactNode } from "react";
import { isValidUrl } from "../../../../common/utils";
import { CopyToClipboard } from "../../../common/CopyToClipboard/copyToClipboard";
import { ANCHOR_TARGET } from "../../common/entities";
import { isClientSideNavigation } from "../../common/utils";

export interface LinkProps {
  className?: string;
  copyable?: boolean;
  label: ReactNode /* link label may be an element */;
  noWrap?: MLinkProps["noWrap"];
  onClick?: () => void;
  target?: ANCHOR_TARGET;
  url: string;
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
  return (
    <>
      {isClientSideNavigation(url) ? (
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
      ) : isValidUrl(url) ? (
        <>
          <MLink
            className={className}
            href={url}
            rel="noopener noreferrer"
            noWrap={noWrap}
            target={target || ANCHOR_TARGET.BLANK}
            onClick={onClick}
          >
            {label}
          </MLink>
          {copyable && <CopyToClipboard copyStr={url} />}
        </>
      ) : (
        label
      )}
    </>
  );
};

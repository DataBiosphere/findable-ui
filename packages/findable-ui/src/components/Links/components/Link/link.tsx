import { Link as MLink, LinkProps as MLinkProps } from "@mui/material";
import NLink from "next/link";
import React, { ReactNode } from "react";
import { isValidRoute, isValidUrl } from "../../../../common/utils";
import { CopyToClipboard } from "../../../common/CopyToClipboard/copyToClipboard";
import { ANCHOR_TARGET } from "../../common/entities";

export interface LinkProps {
  copyable?: boolean;
  label: ReactNode /* link label may be an element */;
  noWrap?: MLinkProps["noWrap"];
  target?: ANCHOR_TARGET;
  url: string;
}

export const Link = ({
  copyable = false,
  label,
  noWrap = false,
  target = ANCHOR_TARGET.SELF,
  url,
}: LinkProps): JSX.Element => {
  return (
    <>
      {isValidRoute(url) || isValidUrl(url) ? (
        <>
          <NLink href={url} passHref>
            <MLink rel="noopener" noWrap={noWrap} target={target}>
              {label}
            </MLink>
          </NLink>
          {copyable && <CopyToClipboard copyStr={url} />}
        </>
      ) : (
        label
      )}
    </>
  );
};

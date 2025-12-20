import { ChevronRightRounded } from "@mui/icons-material";
import { Link, Breadcrumbs as MBreadcrumbs, Typography } from "@mui/material";
import NLink from "next/link";
import React, { ReactNode } from "react";
import { BaseComponentProps } from "../../types";
import { LINK_PROPS } from "./constants";

export interface Breadcrumb {
  path: string;
  text: ReactNode;
}

export interface BreadcrumbsProps extends BaseComponentProps {
  breadcrumbs: Breadcrumb[];
  Separator?: ReactNode;
}

export const Breadcrumbs = ({
  breadcrumbs,
  className,
  Separator = <ChevronRightRounded fontSize="xxsmall" />,
}: BreadcrumbsProps): JSX.Element => {
  return (
    <>
      {breadcrumbs.length > 0 ? (
        <MBreadcrumbs className={className} separator={Separator}>
          {breadcrumbs.map(({ path, text }, b) =>
            path ? (
              <Link {...LINK_PROPS} component={NLink} key={b} href={path}>
                {text}
              </Link>
            ) : (
              <Typography key={`${path}${b}`} maxWidth={180} noWrap>
                {text}
              </Typography>
            ),
          )}
        </MBreadcrumbs>
      ) : null}
    </>
  );
};

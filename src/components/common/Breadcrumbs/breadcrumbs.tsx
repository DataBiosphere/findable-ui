import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Link, Breadcrumbs as MBreadcrumbs, Typography } from "@mui/material";
import NLink from "next/link";
import React, { ReactNode } from "react";
import { BaseComponentProps } from "../../../theme/common/types";

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
  Separator = <ChevronRightRoundedIcon fontSize="xxsmall" />,
}: BreadcrumbsProps): JSX.Element => {
  return (
    <>
      {breadcrumbs.length > 0 ? (
        <MBreadcrumbs className={className} separator={Separator}>
          {breadcrumbs.map(({ path, text }, b) =>
            path ? (
              <Link component={NLink} key={b} href={path}>
                {text}
              </Link>
            ) : (
              <Typography key={`${path}${b}`} maxWidth={180} noWrap>
                {text}
              </Typography>
            )
          )}
        </MBreadcrumbs>
      ) : null}
    </>
  );
};

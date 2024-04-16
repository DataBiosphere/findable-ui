import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {
  Breadcrumbs as MBreadcrumbs,
  Link as BreadcrumbLink,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { ReactNode } from "react";

export interface Breadcrumb {
  path: string;
  text: ReactNode;
}

export interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
  className?: string;
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
              <Link key={`${path}${b}`} href={path} legacyBehavior passHref>
                <BreadcrumbLink>{text}</BreadcrumbLink>
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

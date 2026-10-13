import { ChevronRightRounded } from "@mui/icons-material";
import { Link, Breadcrumbs as MBreadcrumbs, Typography } from "@mui/material";
import NLink from "next/link";
import { JSX, ReactNode } from "react";
import { BaseComponentProps } from "../../types";
import { LINK_PROPS } from "./constants";

/**
 * A breadcrumb, with the path it links to and its text.
 */
export interface Breadcrumb {
  path: string;
  text: ReactNode;
}

/**
 * Props for the Breadcrumbs component.
 */
export interface BreadcrumbsProps extends BaseComponentProps {
  breadcrumbs: Breadcrumb[];
  Separator?: ReactNode;
}

/**
 * Breadcrumbs, rendering a link for each breadcrumb with a path and plain text for one without.
 * @param props - Component props.
 * @param props.breadcrumbs - Breadcrumbs to render.
 * @param props.className - Class name applied to the breadcrumbs.
 * @param props.Separator - Separator between breadcrumbs; defaults to a chevron right icon.
 * @returns The breadcrumbs, or nothing when there are no breadcrumbs.
 */
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

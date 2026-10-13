import { TypographyProps } from "@mui/material";
import { Fragment, JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../styles/common/mui/typography";
import { StyledTypography } from "./title.styles";

/**
 * Page title, rendering string children as an h1 heading.
 * @param props - Component props.
 * @param props.children - Title content.
 * @param props.className - Class name applied to the heading.
 * @returns The title when children is a string, the children as given when truthy and not a string, or null when children is falsy.
 */
export const Title = ({
  children,
  className,
  ...props /* Mui Typography props */
}: TypographyProps): JSX.Element | null => {
  if (!children) return null;

  if (typeof children !== "string") return <Fragment>{children}</Fragment>;

  return (
    <StyledTypography
      className={className}
      color={TYPOGRAPHY_PROPS.COLOR.INK_MAIN}
      component="h1"
      variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_LARGE}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

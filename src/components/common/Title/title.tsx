import { TypographyProps } from "@mui/material";
import React, { Fragment } from "react";
import { TYPOGRAPHY_PROPS } from "../../../styles/common/mui/typography";
import { StyledTypography } from "./title.styles";

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

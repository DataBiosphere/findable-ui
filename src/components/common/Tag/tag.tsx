import { Typography, TypographyProps } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../styles/common/mui/typography";
import { BaseComponentProps } from "../../types";

/**
 * Tag text, rendered as a span with the body 500 typography variant.
 * @param props - Component props.
 * @param props.className - Class name applied to the tag.
 * @returns The tag.
 */
export const Tag = ({
  className,
  ...props
}: BaseComponentProps & TypographyProps): JSX.Element => {
  return (
    <Typography
      className={className}
      component="span"
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_500}
      {...props}
    />
  );
};

import { Typography, TypographyProps } from "@mui/material";
import React from "react";
import { COLOR } from "../../../../../../styles/common/mui/typography";
import { TEXT_BODY_SMALL_400 } from "../../../../../../theme/common/typography";
import { BaseComponentProps } from "../../../../../types";

export const Warning = ({
  children,
  className,
  ...props /* Mui TypographyOwnProps */
}: BaseComponentProps & TypographyProps): JSX.Element | null => {
  if (!children) return null;
  return (
    <Typography
      className={className}
      color={COLOR.INK_LIGHT}
      mt={6}
      variant={TEXT_BODY_SMALL_400}
      {...props}
    >
      {children}
    </Typography>
  );
};

import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

/**
 * Basic KeyValuePairs "value" wrapper component.
 */

export interface ValueElTypeProps {
  children: ReactNode;
}

export const ValueElType = ({
  children,
  ...props /* Spread props to allow for Mui TypographyProps specific prop overrides e.g. "variant". */
}: ValueElTypeProps): JSX.Element => {
  return (
    <Typography variant="text-body-400-2lines" {...props}>
      {children}
    </Typography>
  );
};

import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

/**
 * Basic KeyValuePairs "key" wrapper component.
 */

export interface KeyElTypeProps {
  children: ReactNode;
}

export const KeyElType = ({
  children,
  ...props /* Spread props to allow for Mui TypographyProps specific prop overrides e.g. "variant". */
}: KeyElTypeProps): JSX.Element => {
  return (
    <Typography color="ink.light" variant="text-body-400-2lines" {...props}>
      {children}
    </Typography>
  );
};

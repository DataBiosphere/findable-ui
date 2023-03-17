import { Box, SxProps } from "@mui/material";
import React, { ReactNode } from "react";

// TODO the prop "children" should not necessarily be optional, but it is for now to avoid typescript errors with the use of this component within site configuration files.

export interface GridProps {
  children?: ReactNode | ReactNode[];
  gridSx?: SxProps;
}

/**
 * A basic Grid component for rendering CSS grid.
 */

export const Grid = ({
  children,
  gridSx,
  ...props /* Spread props to allow for Mui Box specific prop overrides. */
}: GridProps): JSX.Element => {
  return (
    <Box display="grid" sx={gridSx} {...props}>
      {children}
    </Box>
  );
};

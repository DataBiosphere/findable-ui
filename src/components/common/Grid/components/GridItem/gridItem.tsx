import { Box, SxProps } from "@mui/material";
import React, { ReactNode } from "react";

// TODO the prop "children" should not necessarily be optional, but it is for now to avoid typescript errors with the use of this component within site configuration files.

export interface GridItemProps {
  children?: ReactNode | ReactNode[];
  gridItemSx?: SxProps;
}

/**
 * A basic Grid Item component for rendering CSS grid items.
 */

export const GridItem = ({
  children,
  gridItemSx,
  ...props /* Spread props to allow for Mui Box specific prop overrides. */
}: GridItemProps): JSX.Element => {
  return (
    <Box sx={gridItemSx} {...props}>
      {children}
    </Box>
  );
};

import { Box, SxProps } from "@mui/material";
import { JSX, ReactNode } from "react";

/**
 * Props for the Grid component.
 */
export interface GridProps {
  children: ReactNode | ReactNode[];
  gridSx?: SxProps;
}

/**
 * A basic Grid component for rendering CSS grid.
 * @param props - Component props.
 * @param props.children - Grid content.
 * @param props.gridSx - Styles applied to the grid.
 * @returns The grid.
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

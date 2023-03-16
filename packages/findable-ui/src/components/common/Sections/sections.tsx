import React, { ReactNode } from "react";
import { FluidPaper, GridPaper } from "../Paper/paper.styles";

export interface SectionsProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

export const Sections = ({
  children,
  className,
}: SectionsProps): JSX.Element => {
  return (
    <FluidPaper className={className}>
      <GridPaper>{children}</GridPaper>
    </FluidPaper>
  );
};

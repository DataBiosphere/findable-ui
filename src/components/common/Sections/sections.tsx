import { JSX, ReactNode } from "react";
import { FluidPaper, GridPaper } from "../Paper/paper.styles";

/**
 * Props for the Sections component.
 */
export interface SectionsProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

/**
 * Container that lays out its children as sections within a fluid paper.
 * @param props - Component props.
 * @param props.children - Sections.
 * @param props.className - Class name applied to the container.
 * @returns The sections container.
 */
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

import { JSX, ReactNode } from "react";
import { Sections } from "../../../common/Sections/sections";

/**
 * Props for the ExportSummary component.
 */
export interface ExportSummaryProps {
  children: ReactNode | ReactNode[];
}

/**
 * Export summary sections.
 * @param props - Component props.
 * @param props.children - Summary sections.
 * @returns The export summary.
 */
export const ExportSummary = ({
  children,
}: ExportSummaryProps): JSX.Element => {
  return <Sections>{children}</Sections>;
};

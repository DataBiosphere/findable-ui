import React, { ReactNode } from "react";
import { Sections } from "../../../common/Sections/sections";

export interface ExportSummaryProps {
  children: ReactNode | ReactNode[];
}

export const ExportSummary = ({
  children,
}: ExportSummaryProps): JSX.Element => {
  return <Sections>{children}</Sections>;
};

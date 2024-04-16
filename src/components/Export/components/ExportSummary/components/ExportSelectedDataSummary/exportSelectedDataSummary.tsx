import React, { ReactNode } from "react";
import { SectionTitle } from "../../../../../common/Section/components/SectionTitle/sectionTitle";
import { GridPaperSection } from "../../../../../common/Section/section.styles";
import { Loading, LOADING_PANEL_STYLE } from "../../../../../Loading/loading";
import { Label, Values } from "../../exportSummary.styles";

export type SummaryValue = ReactNode | ReactNode[];
export type Summary = [ReactNode, SummaryValue];

export interface ExportSelectedDataSummaryProps {
  isLoading: boolean;
  summaries: Summary[];
}

export const ExportSelectedDataSummary = ({
  isLoading,
  summaries,
}: ExportSelectedDataSummaryProps): JSX.Element => {
  return (
    <GridPaperSection>
      <Loading loading={isLoading} panelStyle={LOADING_PANEL_STYLE.INHERIT} />
      <SectionTitle title="Selected Data Summary" />
      {summaries.map(([label, value], i) => (
        <div key={i}>
          <Label>{label}</Label>
          <Values>{value}</Values>
        </div>
      ))}
    </GridPaperSection>
  );
};

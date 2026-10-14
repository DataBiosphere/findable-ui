import { JSX, ReactNode } from "react";
import { TEST_IDS } from "../../../../../../tests/testIds";
import { SectionTitle } from "../../../../../common/Section/components/SectionTitle/sectionTitle";
import { GridPaperSection } from "../../../../../common/Section/section.styles";
import { Loading, LOADING_PANEL_STYLE } from "../../../../../Loading/loading";
import { Label, Values } from "../../exportSummary.styles";

export type SummaryValue = ReactNode | ReactNode[];
export type Summary = [ReactNode, SummaryValue];

/**
 * Props for the ExportSelectedDataSummary component.
 */
export interface ExportSelectedDataSummaryProps {
  isLoading: boolean;
  summaries: Summary[];
}

/**
 * Selected data summary section of the export summary: a label and value for
 * each summary.
 * @param props - Component props.
 * @param props.isLoading - Whether the summary is loading; shows the loading overlay.
 * @param props.summaries - Label and value of each summary.
 * @returns The selected data summary section.
 */
export const ExportSelectedDataSummary = ({
  isLoading,
  summaries,
}: ExportSelectedDataSummaryProps): JSX.Element => {
  return (
    <GridPaperSection data-testid={TEST_IDS.EXPORT_SUMMARY}>
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

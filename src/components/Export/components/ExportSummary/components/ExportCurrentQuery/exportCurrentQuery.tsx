import { Fragment, JSX } from "react";
import { SectionTitle } from "../../../../../common/Section/components/SectionTitle/sectionTitle";
import { GridPaperSection } from "../../../../../common/Section/section.styles";
import { Loading, LOADING_PANEL_STYLE } from "../../../../../Loading/loading";
import { Label, Values } from "../../exportSummary.styles";

export type CurrentQuery = [string, string[]];

export interface ExportCurrentQueryProps {
  isLoading: boolean;
  queries: CurrentQuery[];
}

export const ExportCurrentQuery = ({
  isLoading,
  queries,
}: ExportCurrentQueryProps): JSX.Element => {
  return (
    <GridPaperSection>
      <Loading loading={isLoading} panelStyle={LOADING_PANEL_STYLE.INHERIT} />
      <SectionTitle title="Current Query" />
      {queries.length > 0 ? (
        queries.map(([label, values]) => (
          <div key={label}>
            <Label>{label}</Label>
            <Values>
              {values.map((value, i) => (
                <Fragment key={`${value}${i}`}>
                  {i > 0 && <code>OR</code>}
                  <span>{value}</span>
                </Fragment>
              ))}
            </Values>
          </div>
        ))
      ) : (
        <Values>All Data</Values>
      )}
    </GridPaperSection>
  );
};

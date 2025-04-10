import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { Loading, LOADING_PANEL_STYLE } from "../../../../../Loading/loading";
import { Summary } from "./components/Summary/summary";
import { StyledGrid, StyledGridPaperSection } from "./filterSummary.styles";
import { useFilterSummary } from "./hooks/UseFilterSummary/useFilterSummary";
import { FilterSummaryProps } from "./types";

export const FilterSummary = ({
  categoryFilters,
  loading,
  testId,
}: FilterSummaryProps): JSX.Element | null => {
  const { summaries, summariesRef, width } = useFilterSummary(categoryFilters);
  if (summaries.length === 0) return null;
  return (
    <Fragment>
      <Loading
        appear={false}
        autoPosition={false}
        loading={loading}
        panelStyle={LOADING_PANEL_STYLE.INHERIT}
      />
      <StyledGrid data-testid={testId} ref={summariesRef}>
        {summaries.map(({ key, label, values }) => (
          <StyledGridPaperSection key={key}>
            <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_HEADING_SMALL}>
              {label}
            </Typography>
            <Summary data={values} width={width} />
          </StyledGridPaperSection>
        ))}
      </StyledGrid>
    </Fragment>
  );
};

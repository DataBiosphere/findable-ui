import { Typography } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { Summary } from "./components/Summary/summary";
import { StyledGrid, StyledGridPaperSection } from "./filterSummary.styles";
import { useFilterSummary } from "./hooks/UseFilterSummary/useFilterSummary";
import { FilterSummaryProps } from "./types";

export const FilterSummary = ({
  categoryFilters,
}: FilterSummaryProps): JSX.Element => {
  const { summaries, summariesRef, width } = useFilterSummary(categoryFilters);
  return (
    <StyledGrid ref={summariesRef}>
      {summaries.map(({ key, label, values }) => (
        <StyledGridPaperSection key={key}>
          <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_HEADING_SMALL}>
            {label}
          </Typography>
          <Summary data={values} width={width} />
        </StyledGridPaperSection>
      ))}
    </StyledGrid>
  );
};

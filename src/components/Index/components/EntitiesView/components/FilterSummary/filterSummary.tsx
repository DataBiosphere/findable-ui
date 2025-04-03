import { Typography } from "@mui/material";
import React, { useRef } from "react";
import { BarX } from "../../../../../../components/Plot/components/BarX/barX";
import {
  getBorderBoxSize,
  useResizeObserver,
} from "../../../../../../hooks/useResizeObserver";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { BAR_X_OPTIONS, PLOT_OPTIONS } from "./barX/constants";
import { StyledGrid, StyledGridPaperSection } from "./filterSummary.styles";
import { FilterSummaryProps } from "./types";
import { getSummaries } from "./utils";

export const FilterSummary = ({
  categoryFilters,
}: FilterSummaryProps): JSX.Element => {
  const summaryRef = useRef<HTMLDivElement>(null);
  const summaryRect = useResizeObserver(summaryRef, getBorderBoxSize);
  const filters = getSummaries(categoryFilters);
  return (
    <StyledGrid ref={summaryRef}>
      {filters.map((categoryView) => {
        return (
          <StyledGridPaperSection key={categoryView.key}>
            <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_HEADING_SMALL}>
              {categoryView.label}
            </Typography>
            <BarX
              barXOptions={BAR_X_OPTIONS}
              data={categoryView.values}
              plotOptions={{
                ...PLOT_OPTIONS,
                height: categoryView.values.length * 28 + 48,
                width: summaryRect?.width,
              }}
            />
          </StyledGridPaperSection>
        );
      })}
    </StyledGrid>
  );
};

import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { GridPaperSection } from "../../../../../common/Section/section.styles";
import { FilterSummaryProps } from "./types";

export const FilterSummary = ({
  categoryFilters,
}: FilterSummaryProps): JSX.Element => {
  const filters = categoryFilters.flatMap(({ categoryViews }) => categoryViews);
  return (
    <Fragment>
      {filters.map((categoryView) => (
        <GridPaperSection key={categoryView.key}>
          <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_HEADING_SMALL}>
            {categoryView.label}
          </Typography>
        </GridPaperSection>
      ))}
    </Fragment>
  );
};

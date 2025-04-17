import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { Loading, LOADING_PANEL_STYLE } from "../../../../../Loading/loading";
import { StyledGrid, StyledGridPaperSection } from "./chartView.styles";
import { Chart } from "./components/Chart/chart";
import { useChartView } from "./hooks/UseChartView/useChartView";
import { ChartViewProps } from "./types";

export const ChartView = ({
  categoryFilters,
  entityName,
  loading,
  testId,
}: ChartViewProps): JSX.Element | null => {
  const { chartViewRef, selectCategoryViews, width } =
    useChartView(categoryFilters);
  if (selectCategoryViews.length === 0) return null;
  return (
    <Fragment>
      <Loading
        appear={false}
        autoPosition={false}
        loading={loading}
        panelStyle={LOADING_PANEL_STYLE.INHERIT}
      />
      <StyledGrid data-testid={testId} ref={chartViewRef}>
        {selectCategoryViews.map(({ key, label, values }) => (
          <StyledGridPaperSection key={key}>
            <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_HEADING_SMALL}>
              {entityName} per {label}
            </Typography>
            <Chart selectCategoryValueViews={values} width={width} />
          </StyledGridPaperSection>
        ))}
      </StyledGrid>
    </Fragment>
  );
};

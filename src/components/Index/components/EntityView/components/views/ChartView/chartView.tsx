import { Typography } from "@mui/material";
import { Fragment, JSX } from "react";
import { getChartSortFn } from "../../../../../../../common/chart/sort/utils";
import { TYPOGRAPHY_PROPS } from "../../../../../../../styles/common/mui/typography";
import {
  Loading,
  LOADING_PANEL_STYLE,
} from "../../../../../../Loading/loading";
import { StyledGrid, StyledGridPaperSection } from "./chartView.styles";
import { Chart } from "./components/Chart/chart";
import { useChartView } from "./hooks/UseChartView/useChartView";
import { ChartViewProps } from "./types";

/**
 * Entity list chart view, with a loading overlay and a bar chart for each category view selected by useChartView, titled "<entity name> by <category label>".
 * Each chart's values are sorted by the category's configured chart sort.
 * @param props - Component props.
 * @param props.categoryFilters - Category filters.
 * @param props.entityName - Entity name, used in the chart titles.
 * @param props.loading - Whether the loading overlay is shown.
 * @param props.testId - Test ID applied to the charts grid.
 * @returns The chart view, or null when no category has a chart.
 */
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
        {selectCategoryViews.map(({ chart, key, label, values }) => (
          <StyledGridPaperSection key={key}>
            <Typography variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_SMALL}>
              {entityName} by {label}
            </Typography>
            <Chart
              selectCategoryValueViews={[...values].sort(
                getChartSortFn(chart?.sortBy),
              )}
              width={width}
            />
          </StyledGridPaperSection>
        ))}
      </StyledGrid>
    </Fragment>
  );
};

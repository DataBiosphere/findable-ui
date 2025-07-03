import React, { useMemo } from "react";
import { getPlotOptions } from "./barX/plot";
import { StyledBarX } from "./chart.styles";
import { ChartProps } from "./types";

export const Chart = ({
  selectCategoryValueViews,
  testId,
  width,
}: ChartProps): JSX.Element => {
  const options = useMemo(
    () => getPlotOptions(selectCategoryValueViews, width),
    [selectCategoryValueViews, width]
  );
  return <StyledBarX options={options} testId={testId} />;
};

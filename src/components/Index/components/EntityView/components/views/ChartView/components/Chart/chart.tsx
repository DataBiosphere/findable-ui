import React, { Fragment } from "react";
import { BUTTON_PROPS } from "../../../../../../../../common/Button/constants";
import { StyledBarX, StyledButton } from "./chart.styles";
import { useBarCount } from "./hooks/UseBarCount/hook";
import { isChartExpandable } from "./hooks/UseBarCount/utils";
import { usePlotOptions } from "./hooks/UsePlotOptions/hook";
import { ChartProps } from "./types";
import { renderButtonText } from "./utils";

export const Chart = ({
  selectCategoryValueViews,
  testId,
  width,
}: ChartProps): JSX.Element => {
  const { barCount, onToggleBarCount } = useBarCount(selectCategoryValueViews);
  const { options } = usePlotOptions(selectCategoryValueViews, width, barCount);
  return (
    <Fragment>
      <StyledBarX options={options} testId={testId} />
      {isChartExpandable(selectCategoryValueViews) && (
        <StyledButton
          {...BUTTON_PROPS.PRIMARY_TEXT}
          onClick={(e) => {
            // Scroll, only if we are closing the chart (i.e. barCount is undefined).
            const shouldScroll = barCount === undefined;
            onToggleBarCount();
            if (!shouldScroll) return;
            // Scroll the chart into view.
            e.currentTarget
              ?.closest("div")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {renderButtonText(barCount, selectCategoryValueViews)}
        </StyledButton>
      )}
    </Fragment>
  );
};

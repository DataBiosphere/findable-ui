import { Fragment, JSX } from "react";
import { BUTTON_PROPS } from "../../../../../../../../common/Button/constants";
import { StyledBarX, StyledButton } from "./chart.styles";
import { useBarCount } from "./hooks/UseBarCount/hook";
import { isChartExpandable } from "./hooks/UseBarCount/utils";
import { usePlotOptions } from "./hooks/UsePlotOptions/hook";
import { ChartProps } from "./types";
import { renderButtonText } from "./utils";

/**
 * Bar chart of the category values. With more values than the maximum bar count, it shows a limited number of bars (see useBarCount) and a button to show the additional results or show less; showing less scrolls the chart into view.
 * @param props - Component props.
 * @param props.selectCategoryValueViews - Category values, in display order.
 * @param props.testId - Test ID applied to the chart.
 * @param props.width - Chart width.
 * @returns The chart.
 */
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

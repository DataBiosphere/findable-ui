import { Fragment, JSX } from "react";
import { BUTTON_PROPS } from "../../../../../../../../common/Button/constants";
import { StyledBarX, StyledButton } from "./chart.styles";
import { useBarCount } from "./hooks/UseBarCount/hook";
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
  const { barCount, expandable, expanded, onToggleBarCount } = useBarCount(
    selectCategoryValueViews,
  );
  const { options } = usePlotOptions(selectCategoryValueViews, width, barCount);
  return (
    <Fragment>
      <StyledBarX options={options} testId={testId} />
      {expandable && (
        <StyledButton
          {...BUTTON_PROPS.PRIMARY_TEXT}
          onClick={(e) => {
            onToggleBarCount();
            // Scroll, only if we are closing the chart.
            if (!expanded) return;
            e.currentTarget
              ?.closest("div")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {renderButtonText(expanded, selectCategoryValueViews)}
        </StyledButton>
      )}
    </Fragment>
  );
};

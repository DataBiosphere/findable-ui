import { Fragment, JSX, lazy, Suspense } from "react";
import { SVG_ICON_PROPS } from "../../../../../../../styles/common/mui/svgIcon";
import { LoadingIcon } from "../../../../../../common/CustomIcon/components/LoadingIcon/loadingIcon";
import { StyledToolbar } from "../../../../../../Table/components/TableToolbar/tableToolbar.styles";
import { ViewToggle } from "../../controls/ViewToggle/viewToggle";
import { StyledStack } from "./chartView.styles";
import { ChartViewProps } from "./types";

/**
 * Lazily-loaded ChartView body. Code-splits ChartView — and its
 * `@observablehq/plot` and d3 dependencies — into an async chunk that is only
 * fetched when the chart view is rendered, keeping them out of the initial
 * bundle for consumers that default to the table view.
 */
const ChartView = lazy(() =>
  import("./chartView").then((module) => ({ default: module.ChartView })),
);

/**
 * Renders the view toggle and the lazily-loaded ChartView. The toggle is
 * rendered outside the Suspense boundary so it stays mounted and interactive
 * while the code-split chart chunk is fetched — avoiding a flash of the toggle
 * on the first switch to the graph view — with a loading indicator shown in the
 * chart area until the chunk resolves.
 * @param props - Chart view props, forwarded to the underlying ChartView.
 * @returns The view toggle with the lazily-loaded chart body.
 */
export const LazyChartView = (props: ChartViewProps): JSX.Element => {
  return (
    <Fragment>
      <StyledToolbar>
        <ViewToggle />
      </StyledToolbar>
      <Suspense
        fallback={
          <StyledStack>
            <LoadingIcon
              color={SVG_ICON_PROPS.COLOR.PRIMARY}
              fontSize={SVG_ICON_PROPS.FONT_SIZE.LARGE}
            />
          </StyledStack>
        }
      >
        <ChartView {...props} />
      </Suspense>
    </Fragment>
  );
};

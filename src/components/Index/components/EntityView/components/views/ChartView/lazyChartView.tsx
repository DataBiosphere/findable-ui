import { JSX, lazy, Suspense } from "react";
import {
  Loading,
  LOADING_PANEL_STYLE,
} from "../../../../../../Loading/loading";
import { ChartViewProps } from "./types";

/**
 * Lazily-loaded ChartView. Code-splits ChartView — and its `@observablehq/plot`
 * and d3 dependencies — into an async chunk that is only fetched when the chart
 * view is actually rendered (i.e. when the user switches to the graph view),
 * keeping them out of the initial bundle for consumers that default to the
 * table view.
 */
const ChartView = lazy(() =>
  import("./chartView").then((module) => ({ default: module.ChartView })),
);

/**
 * Renders the lazily-loaded ChartView within a Suspense boundary, showing a
 * loading indicator while the chart chunk is fetched.
 * @param props - Chart view props, forwarded to the underlying ChartView.
 * @returns The chart view, wrapped in a Suspense boundary.
 */
export const LazyChartView = (props: ChartViewProps): JSX.Element => {
  return (
    <Suspense
      fallback={
        <Loading
          appear={false}
          autoPosition={false}
          loading
          panelStyle={LOADING_PANEL_STYLE.INHERIT}
        />
      }
    >
      <ChartView {...props} />
    </Suspense>
  );
};

import * as Plot from "@observablehq/plot";
import { JSX, useEffect, useRef } from "react";
import { BarXProps } from "./types";

/**
 * Chart drawn with Observable Plot from the given options, intended for horizontal
 * bars; redrawn when the options change.
 * @param props - Component props.
 * @param props.className - Class name applied to the container.
 * @param props.options - Plot options.
 * @param props.testId - Test id.
 * @returns The chart container.
 */
export const BarX = ({
  className,
  options,
  testId,
}: BarXProps): JSX.Element => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.innerHTML = "";
    const chart = Plot.plot(options);
    chartRef.current?.appendChild(chart);
    return (): void => chart.remove();
  }, [options]);

  return <div className={className} data-testid={testId} ref={chartRef} />;
};

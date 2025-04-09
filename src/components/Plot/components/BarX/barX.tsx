import * as Plot from "@observablehq/plot";
import React, { useEffect, useRef } from "react";
import { BarXProps } from "./types";

export const BarX = ({ className, options }: BarXProps): JSX.Element => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.innerHTML = "";
    const chart = Plot.plot(options);
    chartRef.current?.appendChild(chart);
    return (): void => chart.remove();
  }, [options]);

  return <div className={className} ref={chartRef} />;
};

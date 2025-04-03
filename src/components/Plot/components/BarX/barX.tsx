import * as Plot from "@observablehq/plot";
import React, { useEffect, useRef } from "react";
import { BarXProps } from "./types";

export const BarX = ({
  barXOptions,
  data,
  plotOptions,
}: BarXProps): JSX.Element => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.innerHTML = "";

    const chart = Plot.plot({
      ...plotOptions,
      marks: [
        Plot.barX(data, barXOptions),
        Plot.text(data, {
          dx: 16,
          dy: -16,
          text: (d) => `${d.label} ${d.selected ? "(selected)" : ""}`,
          textAnchor: "start",
          x: 0,
          y: "label",
        }),
      ],
    });

    chartRef.current?.appendChild(chart);

    return () => chart.remove();
  }, [data, barXOptions, plotOptions]);

  return <div ref={chartRef} />;
};

import React, { useMemo } from "react";
import { getPlotOptions } from "./barX/plot";
import { StyledBarX } from "./summary.styles";
import { SummaryProps } from "./types";

export const Summary = ({ data, testId, width }: SummaryProps): JSX.Element => {
  const options = useMemo(() => getPlotOptions(data, width), [data, width]);
  return <StyledBarX options={options} testId={testId} />;
};

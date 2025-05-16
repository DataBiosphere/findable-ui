import {
  CircularProgress as MCircularProgress,
  CircularProgressProps as MCircularProgressProps,
} from "@mui/material";
import React, { ElementType } from "react";
import { ProgressPositioner } from "./circularProgress.styles";
import { CircularProgressTrack } from "./components/CircularProgressTrack/circularProgressTrack";

export interface CircularProgressProps extends MCircularProgressProps {
  className?: string;
  Track?: ElementType<CircularProgressProps>;
}

export const CircularProgress = ({
  className,
  Track = CircularProgressTrack,
  value,
  ...props /* Spread props to allow for CircularProgress specific props e.g. "disableShrink". */
}: CircularProgressProps): JSX.Element => {
  return (
    <ProgressPositioner className={className}>
      <Track {...props} />
      <MCircularProgress value={value} {...props} />
    </ProgressPositioner>
  );
};

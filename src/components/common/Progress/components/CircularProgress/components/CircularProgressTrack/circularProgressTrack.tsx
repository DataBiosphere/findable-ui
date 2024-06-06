import { CircularProgressProps as MCircularProgressProps } from "@mui/material";
import React, { Fragment } from "react";
import { CircularProgress } from "./circularProgressTrack.styles";

export interface CircularProgressTrackProps extends MCircularProgressProps {
  className?: string;
  track?: boolean;
}

export const CircularProgressTrack = ({
  className,
  track = true,
  value = 100,
  ...props /* Spread props to allow for CircularProgress specific props e.g. "disableShrink". */
}: CircularProgressTrackProps): JSX.Element => {
  return (
    <Fragment>
      {track && (
        <CircularProgress className={className} value={value} {...props} />
      )}
    </Fragment>
  );
};

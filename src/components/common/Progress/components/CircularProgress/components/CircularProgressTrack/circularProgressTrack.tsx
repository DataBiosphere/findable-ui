import { CircularProgressProps as MCircularProgressProps } from "@mui/material";
import { Fragment, JSX } from "react";
import { CircularProgress } from "./circularProgressTrack.styles";

/**
 * Props for the CircularProgressTrack component.
 */
export interface CircularProgressTrackProps extends MCircularProgressProps {
  className?: string;
  track?: boolean;
}

/**
 * Full circle track rendered behind a circular progress indicator.
 * @param props - Component props.
 * @param props.className - Class name applied to the track.
 * @param props.track - Whether the track is shown; defaults to true.
 * @param props.value - Track value; defaults to 100.
 * @returns The circular progress track, or an empty fragment when the track is hidden.
 */
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

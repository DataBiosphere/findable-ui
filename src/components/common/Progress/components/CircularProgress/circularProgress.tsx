import {
  CircularProgress as MCircularProgress,
  CircularProgressProps as MCircularProgressProps,
} from "@mui/material";
import { ElementType, JSX } from "react";
import { ProgressPositioner } from "./circularProgress.styles";
import { CircularProgressTrack } from "./components/CircularProgressTrack/circularProgressTrack";

/**
 * Props for the CircularProgress component.
 */
export interface CircularProgressProps extends MCircularProgressProps {
  className?: string;
  Track?: ElementType<CircularProgressProps>;
}

/**
 * Circular progress indicator rendered over a track.
 * @param props - Component props.
 * @param props.className - Class name applied to the positioning wrapper.
 * @param props.Track - Track component rendered behind the progress indicator; defaults to CircularProgressTrack.
 * @param props.value - Progress value, applied to the progress indicator only.
 * @returns The circular progress indicator.
 */
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

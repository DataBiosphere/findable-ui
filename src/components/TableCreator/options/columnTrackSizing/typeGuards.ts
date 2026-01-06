import { GridTrackMinMax, GridTrackSize } from "../../../../config/entities";

/**
 * Type guard to determine if the given track size represents a size range (min-max).
 * @param width - Grid table track size.
 * @returns `true` if the given grid track size is a `GridTrackMinMax`, otherwise `false`.
 */
export function isGridTrackMinMax(
  width?: GridTrackSize,
): width is GridTrackMinMax {
  return (width as GridTrackMinMax)?.min !== undefined;
}

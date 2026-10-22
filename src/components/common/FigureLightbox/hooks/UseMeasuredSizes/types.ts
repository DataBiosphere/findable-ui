import type { ImageSize } from "../../types";

/**
 * Return value of the useMeasuredSizes hook.
 */
export interface UseMeasuredSizes {
  actions: UseMeasuredSizesActions;
  state: UseMeasuredSizesState;
}

/**
 * Actions returned by the useMeasuredSizes hook.
 */
export interface UseMeasuredSizesActions {
  /** Records the natural size the lightbox measured for an image. */
  onMeasure: (src: string, size: ImageSize) => void;
}

/**
 * State returned by the useMeasuredSizes hook.
 */
export interface UseMeasuredSizesState {
  /** Natural sizes the lightbox measured, by image URL. */
  sizes: Record<string, ImageSize>;
}

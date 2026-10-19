import type { RefObject } from "react";
import type { ZoomRef } from "yet-another-react-lightbox";
// Loads the zoom plugin's type augmentation, which declares ZoomRef.
import type {} from "yet-another-react-lightbox/plugins/zoom";

/**
 * Return value of the useZoom hook.
 */
export interface UseZoom {
  /** Resets the zoom to fit the figure to the screen. */
  onFit: () => void;
  /** Records the zoom level the lightbox reports. */
  onZoom: (props: { zoom: number }) => void;
  /** Steps the zoom in. */
  onZoomIn: () => void;
  /** Steps the zoom out. */
  onZoomOut: () => void;
  /** Current zoom level, where 1 fits the figure to the screen. */
  zoom: number;
  /** Ref to the lightbox's zoom controls. */
  zoomRef: RefObject<ZoomRef | null>;
}

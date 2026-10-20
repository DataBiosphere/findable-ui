// Loads the zoom plugin's type augmentation, which declares ZoomRef; preserve keeps it in the emitted declarations.
/// <reference types="yet-another-react-lightbox/plugins/zoom" preserve="true" />
import type { RefObject } from "react";
import type { ZoomRef } from "yet-another-react-lightbox";

/**
 * Return value of the useZoom hook.
 */
export interface UseZoom {
  actions: UseZoomActions;
  state: UseZoomState;
  /** Ref to the lightbox's zoom controls. */
  zoomRef: RefObject<ZoomRef | null>;
}

/**
 * Zoom actions returned by the useZoom hook.
 */
export interface UseZoomActions {
  /** Resets the zoom to fit the figure to the screen. */
  onFit: () => void;
  /** Records the zoom level the lightbox reports. */
  onZoom: (props: { zoom: number }) => void;
  /** Steps the zoom in. */
  onZoomIn: () => void;
  /** Steps the zoom out. */
  onZoomOut: () => void;
  /** Resets the recorded zoom level to fit, for when a figure opens. */
  resetZoom: () => void;
}

/**
 * Zoom state returned by the useZoom hook.
 */
export interface UseZoomState {
  /** Current zoom level, where 1 fits the figure to the screen. */
  zoom: number;
}

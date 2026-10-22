// Loads the zoom plugin's type augmentation, which declares ZoomRef; preserve keeps it in the emitted declarations.
/// <reference types="yet-another-react-lightbox/plugins/zoom" preserve="true" />
import type { RefCallback } from "react";
import type { ZoomRef } from "yet-another-react-lightbox";

/**
 * Return value of the useZoom hook.
 */
export interface UseZoom {
  actions: UseZoomActions;
  state: UseZoomState;
  /** Callback ref for the lightbox's zoom controls. */
  zoomRef: RefCallback<ZoomRef>;
}

/**
 * Zoom actions returned by the useZoom hook.
 */
export interface UseZoomActions {
  /** Resets the zoom to fit the figure to the screen. */
  onFit: () => void;
  /** Steps the zoom in. */
  onZoomIn: () => void;
  /** Steps the zoom out. */
  onZoomOut: () => void;
}

/**
 * Zoom state returned by the useZoom hook.
 */
export interface UseZoomState {
  /** Maximum zoom level for the current figure and viewport. */
  maxZoom: number;
  /** Current zoom level, where 1 fits the figure to the screen. */
  zoom: number;
}

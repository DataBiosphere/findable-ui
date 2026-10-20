/**
 * Props for the lightbox ZoomControl component.
 */
export interface ZoomControlProps {
  /** Maximum zoom level for the current figure and viewport. */
  maxZoom: number;
  /** Steps the zoom in. */
  onZoomIn: () => void;
  /** Steps the zoom out. */
  onZoomOut: () => void;
  /** Current zoom level, where 1 fits the figure to the screen. */
  zoom: number;
}

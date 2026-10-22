/**
 * A menu action.
 */
export interface MenuAction {
  disabled?: boolean;
  key: string;
  label: string;
  onClick: () => void;
}

/**
 * Props for the lightbox MoreMenu component.
 */
export interface MoreMenuProps {
  /** Maximum zoom level for the current figure and viewport. */
  maxZoom: number;
  /** Resets the zoom to fit the figure to the screen. */
  onFit: () => void;
  /** Steps the zoom in. */
  onZoomIn: () => void;
  /** Steps the zoom out. */
  onZoomOut: () => void;
  /** URL of the original file. */
  originalSrc: string;
  /** Whether to offer zoom in, zoom out and fit, for when the zoom group is hidden. */
  showZoomActions: boolean;
  /** Current zoom level, where 1 fits the figure to the screen. */
  zoom: number;
}

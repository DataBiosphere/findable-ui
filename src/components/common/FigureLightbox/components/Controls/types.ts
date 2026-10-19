import type { LightboxFigureItem } from "../../types";

/**
 * Props for the lightbox Controls component.
 */
export interface ControlsProps {
  /** Figures in the lightbox. */
  figures: LightboxFigureItem[];
  /** Resets the zoom to fit the figure to the screen. */
  onFit: () => void;
  /** Records the figure to show on the page once the lightbox has closed. */
  onShowInContext: (figure: LightboxFigureItem) => void;
  /** Steps the zoom in. */
  onZoomIn: () => void;
  /** Steps the zoom out. */
  onZoomOut: () => void;
  /** Whether the viewport is below the sm breakpoint, where the zoom group is hidden and the menu offers zoom. */
  smDown: boolean;
  /** Current zoom level, where 1 fits the figure to the screen. */
  zoom: number;
}

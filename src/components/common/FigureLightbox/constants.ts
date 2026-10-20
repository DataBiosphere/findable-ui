// Loads the zoom plugin's type augmentation, which declares the zoom prop; preserve keeps it in the emitted declarations.
/// <reference types="yet-another-react-lightbox/plugins/zoom" preserve="true" />
import type { LightboxExternalProps } from "yet-another-react-lightbox";

export const LABEL = {
  CLOSE: "Close",
  COUNTER: "Figure {index} of {total}",
  DOWNLOAD: "Download",
  EXPAND: "Expand figure",
  FIGURES: "Figures",
  FIT: "Fit",
  FIT_ARIA: "Fit to screen",
  MORE: "More actions",
  NEXT: "Next figure",
  PREVIOUS: "Previous figure",
  SHOW_IN_CONTEXT: "Show in context",
  VIEW_ORIGINAL: "View original",
  ZOOM: "Zoom",
  ZOOM_IN: "Zoom in",
  ZOOM_OUT: "Zoom out",
} as const;

/**
 * Vector images (SVG) stay crisp at any size, so their slide size is their
 * natural size scaled by this factor: the lightbox fits them to the viewport
 * and lets them zoom well past their natural size.
 */
export const VECTOR_SCALE = 8;

// Lines of caption shown in the lightbox before it is cut off with an ellipsis;
// the full caption shows in a tooltip.
export const CAPTION_MAX_LINES = 3;

/**
 * Minimum length, in pixels, of a vector image's longer side as a slide. An SVG
 * with a small natural size would otherwise get a slide smaller than the
 * viewport: VectorSlide still fills the viewport, but the zoom plugin fits the
 * smaller slide size and can't zoom it.
 */
export const VECTOR_MIN_SIZE = 8192;

// Room around the figure: the side arrows need it on larger screens; phones have
// no arrows, so the figure can use the full width.
export const CAROUSEL_PADDING = {
  DEFAULT: "88px",
  SM_DOWN: "16px",
} as const;

export const LIGHTBOX_PROPS: Pick<
  LightboxExternalProps,
  "animation" | "carousel" | "controller" | "toolbar" | "zoom"
> = {
  animation: { zoom: 200 },
  carousel: { finite: true, padding: CAROUSEL_PADDING.DEFAULT },
  controller: { closeOnBackdropClick: true },
  toolbar: { buttons: [] },
  zoom: { maxZoomPixelRatio: 1, scrollToZoom: true },
};

import type { LightboxExternalProps } from "yet-another-react-lightbox";

export const LABEL = {
  CLOSE: "Close",
  COUNTER: "Figure {index} of {total}",
  DOWNLOAD: "Download",
  EXPAND: "Expand figure",
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

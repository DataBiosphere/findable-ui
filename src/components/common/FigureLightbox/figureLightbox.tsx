import { JSX, useCallback, useMemo } from "react";
import type { SlideImage } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { Controls } from "./components/Controls/controls";
import { VectorSlide } from "./components/VectorSlide/vectorSlide";
import { CAROUSEL_PADDING, LABEL, LIGHTBOX_PROPS } from "./constants";
import { StyledLightbox } from "./figureLightbox.styles";
import { useShowInContext } from "./hooks/UseShowInContext/hook";
import { useZoom } from "./hooks/UseZoom/hook";
import { FigureLightboxProps } from "./types";
import { buildSlide, isVectorSlide } from "./utils";

const PLUGINS = [Zoom];

/**
 * Full-viewport lightbox for figures, with zoom and pan, the figure's caption, and previous and next between figures.
 * Built on yet-another-react-lightbox and its zoom plugin, with findable's own controls in place of the library's.
 * Usually rendered by FigureLightboxProvider rather than directly.
 * @param props - Component props.
 * @param props.figures - Figures to show, in display order.
 * @param props.index - Index of the figure to show.
 * @param props.onClose - Called when the lightbox closes.
 * @param props.onIndexChange - Called when the shown figure changes.
 * @param props.open - Whether the lightbox is open.
 * @returns The lightbox.
 */
export const FigureLightbox = ({
  figures,
  index,
  onClose,
  onIndexChange,
  open,
}: FigureLightboxProps): JSX.Element => {
  const {
    actions: { onFit, onZoom, onZoomIn, onZoomOut, resetZoom },
    state: { zoom },
    zoomRef,
  } = useZoom();

  const {
    actions: { onExited, onShowInContext },
  } = useShowInContext();
  const { smDown } = useBreakpoint();

  // Slide sizes come from the inline images' natural size, which is only known
  // once they have loaded, so the slides are rebuilt each time the lightbox opens.
  const slides = useMemo(
    () => figures.map(buildSlide),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- "open" isn't read, but opening is when the inline images' natural size is read.
    [figures, open],
  );

  // Called when the lightbox opens and each time the figure changes.
  const onView = useCallback(
    ({ index }: { index: number }): void => {
      resetZoom();
      onIndexChange(index);
    },
    [onIndexChange, resetZoom],
  );

  return (
    <StyledLightbox
      {...LIGHTBOX_PROPS}
      carousel={{
        ...LIGHTBOX_PROPS.carousel,
        padding: smDown ? CAROUSEL_PADDING.SM_DOWN : CAROUSEL_PADDING.DEFAULT,
      }}
      close={onClose}
      index={index}
      labels={{
        Lightbox: figures[index]?.alt ?? "",
        "{index} of {total}": LABEL.COUNTER,
      }}
      on={{ exited: onExited, view: onView, zoom: onZoom }}
      open={open}
      plugins={PLUGINS}
      render={{
        // The library's own buttons are replaced by Controls.
        buttonNext: () => null,
        buttonPrev: () => null,
        buttonZoom: () => null,
        controls: () => (
          <Controls
            figures={figures}
            onFit={onFit}
            onShowInContext={onShowInContext}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            zoom={zoom}
          />
        ),
        // Vector images fill the viewport; other images use the library's slide.
        slide: ({ rect, slide }) =>
          isVectorSlide(slide as SlideImage) ? (
            <VectorSlide rect={rect} slide={slide as SlideImage} />
          ) : undefined,
      }}
      slides={slides}
      zoom={{ ...LIGHTBOX_PROPS.zoom, ref: zoomRef }}
    />
  );
};

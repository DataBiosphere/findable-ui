import { useCallback, useRef, useState } from "react";
import type { ZoomRef } from "yet-another-react-lightbox";
import { UseZoom } from "./types";

/**
 * Tracks the lightbox zoom level and exposes the zoom actions, for the zoom controls in the lightbox top bar.
 * @returns The zoom actions, the zoom state (the zoom level) and the zoom ref.
 */
export function useZoom(): UseZoom {
  const zoomRef = useRef<ZoomRef>(null);
  const [zoom, setZoom] = useState<number>(1);

  const onFit = useCallback((): void => {
    zoomRef.current?.changeZoom(1);
  }, []);

  const onZoom = useCallback(({ zoom }: { zoom: number }): void => {
    setZoom(zoom);
  }, []);

  const onZoomIn = useCallback((): void => {
    zoomRef.current?.zoomIn();
  }, []);

  const onZoomOut = useCallback((): void => {
    zoomRef.current?.zoomOut();
  }, []);

  // Each figure opens fitted to the screen. The zoom plugin resets its own zoom
  // when the lightbox opens or the figure changes, but it doesn't always report
  // the reset (it is disabled until the figure has been laid out), so the
  // recorded zoom is reset here.
  const resetZoom = useCallback((): void => {
    setZoom(1);
  }, []);

  return {
    actions: { onFit, onZoom, onZoomIn, onZoomOut, resetZoom },
    state: { zoom },
    zoomRef,
  };
}

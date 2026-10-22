import { useCallback, useRef, useState } from "react";
import type { ZoomRef } from "yet-another-react-lightbox";
import type { UseZoom } from "./types";

/**
 * Tracks the lightbox zoom level and maximum zoom level, and exposes the zoom actions, for the zoom controls in the lightbox top bar.
 * @returns The zoom actions, the zoom state (the zoom level and the maximum zoom level) and the zoom ref.
 */
export function useZoom(): UseZoom {
  const zoomControlsRef = useRef<ZoomRef>(null);
  const [maxZoom, setMaxZoom] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1);

  // The zoom plugin hands the ref its zoom controls again whenever they change,
  // so both levels are read from the same controls: the zoom level, which the
  // plugin resets to fit each time a figure opens, and the maximum zoom, which
  // depends on the figure and the viewport. The controls also change on each
  // pan step, when the levels set here are unchanged.
  const zoomRef = useCallback((controls: ZoomRef | null): void => {
    zoomControlsRef.current = controls;
    if (!controls) return;
    setMaxZoom(controls.maxZoom);
    setZoom(controls.zoom);
  }, []);

  const onFit = useCallback((): void => {
    zoomControlsRef.current?.changeZoom(1);
  }, []);

  const onZoomIn = useCallback((): void => {
    zoomControlsRef.current?.zoomIn();
  }, []);

  const onZoomOut = useCallback((): void => {
    zoomControlsRef.current?.zoomOut();
  }, []);

  return {
    actions: { onFit, onZoomIn, onZoomOut },
    state: { maxZoom, zoom },
    zoomRef,
  };
}

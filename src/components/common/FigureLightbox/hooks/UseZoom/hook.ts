import { useCallback, useRef, useState } from "react";
import type { ZoomRef } from "yet-another-react-lightbox";
import { UseZoom } from "./types";

/**
 * Tracks the lightbox zoom level and exposes the zoom actions, for the zoom controls in the lightbox top bar.
 * @returns The zoom level, the zoom ref and the zoom actions.
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

  return { onFit, onZoom, onZoomIn, onZoomOut, zoom, zoomRef };
}

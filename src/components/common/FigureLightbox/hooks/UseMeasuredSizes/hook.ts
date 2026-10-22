import { useCallback, useState } from "react";
import type { ImageSize } from "../../types";
import type { UseMeasuredSizes } from "./types";

/**
 * Records the natural sizes the lightbox measures when it loads a vector image whose inline copy hasn't given a size, e.g. one that hadn't loaded when the lightbox opened. Slides are rebuilt with the size, so the image fits the viewport and zooms.
 * @returns The measure action and the measured sizes, by image URL.
 */
export function useMeasuredSizes(): UseMeasuredSizes {
  const [sizes, setSizes] = useState<Record<string, ImageSize>>({});

  const onMeasure = useCallback((src: string, size: ImageSize): void => {
    setSizes((sizes) => (sizes[src] ? sizes : { ...sizes, [src]: size }));
  }, []);

  return { actions: { onMeasure }, state: { sizes } };
}

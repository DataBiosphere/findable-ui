import type { FigureLightbox } from "../figureLightbox";

/**
 * Loads the lightbox component in its own chunk, with the lightbox library, its
 * zoom plugin and its styles, so pages only download them once a figure is
 * hovered, focused or opened. The module is fetched once; later calls reuse it.
 * @returns The lightbox component.
 */
export function loadFigureLightbox(): Promise<typeof FigureLightbox> {
  return import("../figureLightbox").then(
    ({ FigureLightbox }) => FigureLightbox,
  );
}

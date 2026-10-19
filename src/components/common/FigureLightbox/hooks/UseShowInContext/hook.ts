import { useCallback, useRef } from "react";
import type { LightboxFigureItem } from "../../types";
import { UseShowInContext } from "./types";
import { showFigure } from "./utils";

/**
 * Handles the lightbox's "Show in context" action: records the figure, and once the lightbox has closed, scrolls the figure into view and focuses it.
 * The lightbox must be closed through its own close action (the controller's close), not by setting it closed: that action restores focus to the figure that opened the lightbox as it starts closing, and calls on.exited once it has faded out, so showing the figure then overrides the restore.
 * @returns The "Show in context" actions: the handler that records the figure, and the handler to call once the lightbox has closed.
 */
export function useShowInContext(): UseShowInContext {
  // The figure to show on the page once the lightbox has closed.
  const pendingFigureRef = useRef<LightboxFigureItem>(undefined);

  const onExited = useCallback((): void => {
    const figure = pendingFigureRef.current;
    pendingFigureRef.current = undefined;
    if (figure) showFigure(figure);
  }, []);

  const onShowInContext = useCallback((figure: LightboxFigureItem): void => {
    pendingFigureRef.current = figure;
  }, []);

  return { actions: { onExited, onShowInContext } };
}

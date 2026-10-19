import { JSX, useCallback, useMemo, useState } from "react";
import { FigureLightbox } from "../figureLightbox";
import type { LightboxFigureItem } from "../types";
import { compareDocumentOrder } from "../utils";
import { FigureLightboxContext } from "./context";
import { FigureLightboxProviderProps } from "./types";

/**
 * Groups the figures inside it, so a click on any of them opens one lightbox that can step between them.
 * Figures are counted and stepped through in document order, not the order they mount.
 * @param props - Component props.
 * @param props.children - Children, including LightboxFigure components.
 * @returns The provider, with the lightbox.
 */
export function FigureLightboxProvider({
  children,
}: FigureLightboxProviderProps): JSX.Element {
  const [figures, setFigures] = useState<LightboxFigureItem[]>([]);
  // The shown figure is kept after closing, so the lightbox keeps showing it while it fades out.
  const [currentId, setCurrentId] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);

  const orderedFigures = useMemo(
    () => [...figures].sort(compareDocumentOrder),
    [figures],
  );

  const index = Math.max(
    orderedFigures.findIndex(({ id }) => id === currentId),
    0,
  );

  const onClose = useCallback((): void => setOpen(false), []);

  const onIndexChange = useCallback(
    (index: number): void => setCurrentId(orderedFigures[index]?.id),
    [orderedFigures],
  );

  // A new figures array on open re-runs the sort above: figures already on the
  // page can be reordered without re-registering.
  const onOpen = useCallback((id: string): void => {
    setFigures((figures) => [...figures]);
    setCurrentId(id);
    setOpen(true);
  }, []);

  const register = useCallback((figure: LightboxFigureItem): void => {
    setFigures((figures) =>
      figures.some(({ id }) => id === figure.id)
        ? figures.map((f) => (f.id === figure.id ? figure : f))
        : [...figures, figure],
    );
  }, []);

  const unregister = useCallback((id: string): void => {
    setFigures((figures) => figures.filter((figure) => figure.id !== id));
  }, []);

  const value = useMemo(
    () => ({ actions: { onOpen, register, unregister } }),
    [onOpen, register, unregister],
  );

  return (
    <FigureLightboxContext.Provider value={value}>
      {children}
      <FigureLightbox
        figures={orderedFigures}
        index={index}
        onClose={onClose}
        onIndexChange={onIndexChange}
        open={open}
      />
    </FigureLightboxContext.Provider>
  );
}

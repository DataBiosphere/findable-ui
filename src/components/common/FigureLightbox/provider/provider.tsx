import { JSX, useCallback, useMemo, useState } from "react";
import type { FigureLightbox } from "../figureLightbox";
import { useCloseOnRouteChange } from "../hooks/UseCloseOnRouteChange/hook";
import type { LightboxFigureItem } from "../types";
import { compareDocumentOrder } from "../utils";
import { FigureLightboxContext } from "./context";
import type { FigureLightboxProviderProps } from "./types";
import { loadFigureLightbox } from "./utils";

/**
 * Groups the figures inside it, so a click on any of them opens one lightbox that can step between them.
 * Figures are counted and stepped through in document order, not the order they mount.
 * The lightbox is loaded when a figure is first hovered, focused or opened, and mounted once loaded, so a page whose figures are never used never downloads it.
 * It is kept in state rather than loaded with React.lazy: lazy suspends on its first render even when the module is already loaded, and React then holds the reveal back for up to 300ms.
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
  // Undefined until loaded; the lightbox is mounted from then on.
  const [Lightbox, setLightbox] = useState<typeof FigureLightbox>();

  const orderedFigures = useMemo(
    () => [...figures].sort(compareDocumentOrder),
    [figures],
  );

  const index = Math.max(
    orderedFigures.findIndex(({ id }) => id === currentId),
    0,
  );

  const onClose = useCallback((): void => setOpen(false), []);

  // Until the lightbox has loaded, it can't close itself on navigation, so an
  // open still waiting on the load is cancelled here.
  useCloseOnRouteChange({ onClose, open: open && !Lightbox });

  const onIndexChange = useCallback(
    (index: number): void => setCurrentId(orderedFigures[index]?.id),
    [orderedFigures],
  );

  // A failed load cancels a pending open, so a later load can't open the
  // lightbox unasked, and is retried on the next hover, focus or open.
  const onPreload = useCallback((): void => {
    void loadFigureLightbox().then(
      (component) => setLightbox(() => component),
      () => setOpen(false),
    );
  }, []);

  // A new figures array on open re-runs the sort above: figures already on the
  // page can be reordered without re-registering.
  const onOpen = useCallback(
    (id: string): void => {
      onPreload();
      setFigures((figures) => [...figures]);
      setCurrentId(id);
      setOpen(true);
    },
    [onPreload],
  );

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
    () => ({ actions: { onOpen, onPreload, register, unregister } }),
    [onOpen, onPreload, register, unregister],
  );

  return (
    <FigureLightboxContext.Provider value={value}>
      {children}
      {Lightbox && (
        <Lightbox
          figures={orderedFigures}
          index={index}
          onClose={onClose}
          onIndexChange={onIndexChange}
          open={open}
        />
      )}
    </FigureLightboxContext.Provider>
  );
}

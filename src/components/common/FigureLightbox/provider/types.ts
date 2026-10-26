import type { ReactNode } from "react";
import type { LightboxFigureItem } from "../types";

/**
 * Figure lightbox context actions: register figures, and load and open the lightbox.
 */
export interface FigureLightboxContextActions {
  /** Opens the lightbox at the figure with the given id. */
  onOpen: (id: string) => void;
  /** Starts loading the lightbox, e.g. on hover or focus, so it is ready to open. */
  onPreload?: () => void;
  /** Adds a figure to the lightbox, or updates it in place if already added. */
  register: (figure: LightboxFigureItem) => void;
  /** Removes the figure with the given id from the lightbox. */
  unregister: (id: string) => void;
}

/**
 * Figure lightbox context.
 */
export interface FigureLightboxContextProps {
  actions: FigureLightboxContextActions;
}

/**
 * Props for the FigureLightboxProvider component.
 */
export interface FigureLightboxProviderProps {
  children: ReactNode;
}

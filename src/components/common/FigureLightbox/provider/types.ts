import type { ReactNode } from "react";
import type { LightboxFigureItem } from "../types";

/**
 * Figure lightbox context: registers figures and opens the lightbox.
 */
export interface FigureLightboxContextProps {
  /** Opens the lightbox at the figure with the given id. */
  onOpen: (id: string) => void;
  /** Adds a figure to the lightbox, or updates it in place if already added. */
  register: (figure: LightboxFigureItem) => void;
  /** Removes the figure with the given id from the lightbox. */
  unregister: (id: string) => void;
}

/**
 * Props for the FigureLightboxProvider component.
 */
export interface FigureLightboxProviderProps {
  children: ReactNode;
}

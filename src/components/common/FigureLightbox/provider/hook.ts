import { useContext } from "react";
import { FigureLightboxContext } from "./context";
import type { FigureLightboxContextProps } from "./types";

/**
 * Returns the figure lightbox context, or undefined outside a FigureLightboxProvider.
 * @returns Figure lightbox context.
 */
export const useFigureLightbox = (): FigureLightboxContextProps | undefined => {
  return useContext(FigureLightboxContext);
};

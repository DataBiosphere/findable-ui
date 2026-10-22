import { createContext } from "react";
import type { FigureLightboxContextProps } from "./types";

// Undefined outside a FigureLightboxProvider, so a figure can tell it has no group.
export const FigureLightboxContext = createContext<
  FigureLightboxContextProps | undefined
>(undefined);

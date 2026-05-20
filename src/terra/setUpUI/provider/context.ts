import { createContext } from "react";
import { TerraSetUpUIContextValue } from "./types";

/**
 * Terra set-up UI context.
 */
export const TerraSetUpUIContext = createContext<TerraSetUpUIContextValue>({
  isOpen: true,
  onChange: () => undefined,
});

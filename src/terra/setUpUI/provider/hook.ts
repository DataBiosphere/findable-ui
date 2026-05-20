import { useContext } from "react";
import { TerraSetUpUIContext } from "./context";
import { TerraSetUpUIContextValue } from "./types";

/**
 * Returns the terra set-up UI context value.
 * @returns terra set-up UI context value.
 */
export function useTerraSetUpUI(): TerraSetUpUIContextValue {
  return useContext(TerraSetUpUIContext);
}

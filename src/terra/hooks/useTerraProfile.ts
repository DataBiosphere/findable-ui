import { useContext } from "react";
import { TerraProfileContext } from "../context";
import { TerraProfileContextProps } from "../types/context";

/**
 * Terra profile hook.
 * @returns terra profile context.
 */
export const useTerraProfile = (): TerraProfileContextProps => {
  return useContext<TerraProfileContextProps>(TerraProfileContext);
};

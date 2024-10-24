import { useContext } from "react";
import { TerraProfileContext } from "./context";
import { TerraProfileContextProps } from "./types";

/**
 * Terra profile hook.
 * @returns terra profile context.
 */
export const useTerraProfile = (): TerraProfileContextProps => {
  return useContext<TerraProfileContextProps>(TerraProfileContext);
};

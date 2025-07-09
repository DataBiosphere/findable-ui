import { useContext } from "react";
import { EntityViewContext } from "./context";
import { EntityViewContextProps } from "./types";

/**
 * Returns entity view context.
 * @returns entity view context.
 */
export const useEntityView = (): EntityViewContextProps => {
  return useContext(EntityViewContext);
};

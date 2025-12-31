import { useContext } from "react";
import { TablesContext } from "../../context";
import { TablesContextValue } from "../../types";

/**
 * Returns tables context.
 * @returns tables context.
 */
export const useTables = (): TablesContextValue => {
  const tablesContext = useContext(TablesContext);

  if (!tablesContext)
    throw new Error("useTables must be used within TablesProvider");

  return tablesContext;
};

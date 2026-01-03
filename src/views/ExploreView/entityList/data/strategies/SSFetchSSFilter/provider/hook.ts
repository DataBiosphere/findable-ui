import { useContext } from "react";
import { ServerDataContext } from "./context";
import { ServerDataContextProps } from "./types";

/**
 * Returns server-provided data term facets and pagination information.
 * @returns Facets and pagination information.
 */
export const useServerData = (): ServerDataContextProps => {
  return useContext(ServerDataContext);
};

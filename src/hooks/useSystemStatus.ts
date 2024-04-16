import { useContext } from "react";
import { SystemStatus, SystemStatusContext } from "../providers/systemStatus";

/**
 * Returns system status.
 * @returns system status.
 */
export const useSystemStatus = (): SystemStatus => {
  return useContext(SystemStatusContext);
};

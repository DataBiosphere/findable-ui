import { createContext } from "react";
import { CollapseContextProps } from "./types";

/**
 * Collapse context. Tracks an in/out boolean and a toggle callback for any
 * collapsible UI surface that opts in via `CollapseProvider`.
 */
export const CollapseContext = createContext<CollapseContextProps>({
  isIn: false,
  onChange: () => undefined,
});

import { createContext } from "react";
import { QueryContextValue } from "./types";

/**
 * Context for the query submission provider.
 */
export const QueryContext = createContext<QueryContextValue>({
  onSubmit: () => Promise.resolve(),
});

import { createContext } from "react";
import { RevisionContextValue } from "./types";

export const RevisionContext = createContext<RevisionContextValue>({
  revision: "",
});

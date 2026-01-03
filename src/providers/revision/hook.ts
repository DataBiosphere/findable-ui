import { useContext } from "react";
import { RevisionContext } from "./context";
import { RevisionContextValue } from "./types";

export const useRevision = (): RevisionContextValue => {
  return useContext(RevisionContext);
};

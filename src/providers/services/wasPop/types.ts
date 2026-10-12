import { MutableRefObject } from "react";
import { NextHistoryState } from "../../../services/beforePopState/types";

/**
 * WasPop context, for telling whether the current navigation came from browser back/forward.
 */
export interface WasPopContextProps {
  onClearPopRef: () => void;
  popRef: MutableRefObject<NextHistoryState | undefined>;
}

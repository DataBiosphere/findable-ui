import { MutableRefObject } from "react";
import { NextHistoryState } from "../../../services/beforePopState/types";

export interface WasPopContextProps {
  onClearPopRef: () => void;
  popRef: MutableRefObject<NextHistoryState | undefined>;
}

import { createContext } from "react";
import { WasPopContextProps } from "./types";

export const WasPopContext = createContext<WasPopContextProps>({
  onClearPopRef: () => {},
  popRef: { current: undefined },
});

import { useContext } from "react";
import { WasPopContext } from "./context";
import { WasPopContextProps } from "./types";

export const useWasPop = (): WasPopContextProps => {
  return useContext(WasPopContext);
};

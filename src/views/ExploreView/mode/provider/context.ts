import { createContext } from "react";
import { ModeContextProps } from "./types";
import { MODE } from "../types";

export const ModeContext = createContext<ModeContextProps>({
  value: MODE.SEARCH,
});

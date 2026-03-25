import { createContext } from "react";
import { InputContextValue } from "./types";

export const InputContext = createContext<InputContextValue>(
  {} as InputContextValue,
);

import { createContext } from "react";
import { InputActionsContextValue, InputValueContextValue } from "./types";

export const InputActionsContext = createContext<
  InputActionsContextValue | undefined
>(undefined);

export const InputValueContext = createContext<
  InputValueContextValue | undefined
>(undefined);

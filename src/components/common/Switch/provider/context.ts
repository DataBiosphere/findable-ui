import { ChangeEvent, createContext } from "react";
import { SwitchContextProps } from "./types";

export const SwitchContext = createContext<SwitchContextProps>({
  checked: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Default context implementation requires parameter signature
  onChange: (e: ChangeEvent<HTMLInputElement>) => {},
});

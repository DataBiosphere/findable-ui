import { createContext } from "react";
import { DataDictionaryContextProps } from "./types";

export const DataDictionaryContext = createContext<DataDictionaryContextProps>({
  dictionary: "",
});

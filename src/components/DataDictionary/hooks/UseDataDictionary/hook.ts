import { useConfig } from "../../../../hooks/useConfig";
import { UseDataDictionary } from "./types";

export const useDataDictionary = (): UseDataDictionary => {
  const {
    config: { dataDictionary: { classes = [] } = {} },
  } = useConfig();
  return { classes };
};

import { useMemo } from "react";
import { useConfig } from "../../../../hooks/useConfig";
import { UseDataDictionary } from "./types";

export const useDataDictionary = (): UseDataDictionary => {
  const {
    config: { dataDictionary: { classes = [] } = {} },
  } = useConfig();
  return useMemo(() => ({ classes }), [classes]);
};

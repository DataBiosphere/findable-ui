import { useReducer } from "react";
import { initializer } from "../../initializer/initializer";
import { tablesReducer } from "../../reducer";
import { TablesContextValue } from "../../types";
import { InitialArgs } from "../../initializer/types";

export const useTablesReducer = (
  initialArgs: InitialArgs,
): TablesContextValue => {
  const [state, dispatch] = useReducer(tablesReducer, initialArgs, initializer);

  return { dispatch, state };
};

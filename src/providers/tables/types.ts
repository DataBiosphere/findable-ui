import { Dispatch } from "react";
import { TablesAction } from "./actions/types";
import { TablesState } from "./state/types";

export interface TablesContextValue {
  dispatch: Dispatch<TablesAction>;
  state: TablesState;
}

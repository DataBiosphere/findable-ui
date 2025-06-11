import { Dispatch } from "react";
import { META_COMMAND } from "../../hooks/stateSyncManager/hooks/UseMetaCommands/types";
import { DataDictionaryAction } from "./actions/types";
import { DictionariesContext } from "./dictionaries/types";

export interface DataDictionaryState {
  dictionaries: DictionariesContext;
  meta: Meta | null;
}

export interface DataDictionaryStateContextProps {
  dataDictionaryDispatch: Dispatch<DataDictionaryAction> | null;
  dataDictionaryState: DataDictionaryState;
}

export interface Meta {
  command: META_COMMAND;
}

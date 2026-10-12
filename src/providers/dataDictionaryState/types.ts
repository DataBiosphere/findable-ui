import { Dispatch } from "react";
import { META_COMMAND } from "../../hooks/stateSyncManager/hooks/UseMetaCommands/types";
import { DataDictionaryAction } from "./actions/types";
import { DictionariesContext } from "./dictionaries/types";

/**
 * Data dictionary state.
 */
export interface DataDictionaryState {
  dictionaries: DictionariesContext;
  meta: Meta | null;
}

/**
 * Data dictionary state context.
 */
export interface DataDictionaryStateContextProps {
  dataDictionaryDispatch: Dispatch<DataDictionaryAction> | null;
  dataDictionaryState: DataDictionaryState;
}

/**
 * Data dictionary state meta: the pending state sync command.
 */
export interface Meta {
  command: META_COMMAND;
}

import { DataDictionaryStateContextProps } from "providers/dataDictionary/types";
import { useEffect, useMemo } from "react";
import { clearMeta } from "../dataDictionary/actions/clearMeta/dispatch";
import { updateUrlFromState } from "./handlers";
import { META_COMMAND } from "./types";

export function useMetaCommands({
  dataDictionaryDispatch,
  dataDictionaryState,
}: DataDictionaryStateContextProps): void {
  // Command.
  const command = dataDictionaryState.meta?.command;

  // Meta-command state.
  const { columnFilters } = dataDictionaryState;
  const state = useMemo(() => ({ columnFilters }), [columnFilters]);

  // Meta-command related side effects.
  useEffect(() => {
    switch (command) {
      case META_COMMAND.STATE_TO_URL_PUSH:
        updateUrlFromState(state);
        dataDictionaryDispatch?.(clearMeta());
        break;
      case META_COMMAND.STATE_TO_URL_REPLACE:
        updateUrlFromState(state, "replace");
        dataDictionaryDispatch?.(clearMeta());
        break;
      default:
        break;
    }
  }, [command, dataDictionaryDispatch, state]);
}

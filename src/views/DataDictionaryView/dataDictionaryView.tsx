import { JSX } from "react";
import { DataDictionary } from "../../components/DataDictionary/dataDictionary";
import { useStateSyncManager } from "../../hooks/stateSyncManager/hook";
import { DataDictionaryContext } from "../../providers/dataDictionary/context";
import { clearMeta } from "../../providers/dataDictionaryState/actions/clearMeta/dispatch";
import { stateToUrl } from "../../providers/dataDictionaryState/actions/stateToUrl/dispatch";
import { urlToState } from "../../providers/dataDictionaryState/actions/urlToState/dispatch";
import { useDataDictionaryState } from "../../providers/dataDictionaryState/hooks/UseDataDictionaryState/hook";
import { DataDictionaryViewProps } from "./types";
import { buildStateSyncManagerContext } from "./utils";

export const DataDictionaryView = ({
  className,
  dictionary,
}: DataDictionaryViewProps): JSX.Element => {
  const { dataDictionaryDispatch, dataDictionaryState } =
    useDataDictionaryState();

  useStateSyncManager({
    actions: { clearMeta, stateToUrl, urlToState },
    dispatch: dataDictionaryDispatch,
    state: buildStateSyncManagerContext(dataDictionaryState, dictionary),
  });

  return (
    <DataDictionaryContext.Provider value={{ dictionary }}>
      {/* Using dictionary as `key` to force component mount when dictionary changes to prevent stale outline, global filter value. */}
      <DataDictionary
        key={dictionary}
        className={className}
        dictionary={dictionary}
      />
    </DataDictionaryContext.Provider>
  );
};

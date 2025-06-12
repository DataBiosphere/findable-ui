import { GlobalFilterOptions, RowData, Updater } from "@tanstack/react-table";
import { useCallback } from "react";
import { Attribute } from "../../../../../../common/entities";
import { useDataDictionary } from "../../../../../../providers/dataDictionary/hook";
import { updateGlobalFilter } from "../../../../../../providers/dataDictionaryState/actions/updateGlobalFilter/dispatch";
import { useDataDictionaryState } from "../../../../../../providers/dataDictionaryState/hooks/UseDataDictionaryState/hook";
import { GLOBAL_FILTER_OPTIONS } from "./constants";

export const useGlobalFilterOptions = <
  T extends RowData = Attribute
>(): GlobalFilterOptions<T> => {
  const { dictionary } = useDataDictionary();
  const { dataDictionaryDispatch } = useDataDictionaryState();

  const onGlobalFilterChange = useCallback(
    (updaterOrValue: Updater<string>): void => {
      dataDictionaryDispatch?.(
        updateGlobalFilter({ dictionary, updaterOrValue })
      );
    },
    [dataDictionaryDispatch, dictionary]
  );

  return {
    ...GLOBAL_FILTER_OPTIONS,
    onGlobalFilterChange,
  } as GlobalFilterOptions<T>;
};

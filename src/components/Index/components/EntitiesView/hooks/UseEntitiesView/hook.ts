import { MouseEvent, useCallback, useState } from "react";
import { useConfig } from "../../../../../../hooks/useConfig";
import { UseEntitiesViewProps, VIEW_TYPE } from "./types";

export const useEntitiesView = (): UseEntitiesViewProps => {
  const [viewType, setViewType] = useState<VIEW_TYPE>(VIEW_TYPE.TABLE);
  const { config } = useConfig();
  const { enableEntitiesView = false } = config;
  const disabled = !enableEntitiesView;
  const isTableView = viewType === VIEW_TYPE.TABLE;

  const onChange = useCallback((_: MouseEvent, value: VIEW_TYPE) => {
    setViewType(value);
  }, []);

  return {
    onChange,
    viewStatus: { disabled, isTableView },
  };
};

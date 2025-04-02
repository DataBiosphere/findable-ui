import { useConfig } from "../../../../../../hooks/useConfig";
import { useToggleButtonGroup } from "../../../../../common/ToggleButtonGroup/hooks/UseToggleButtonGroup/hook";
import { UseEntitiesViewProps, VIEW_TYPE } from "./types";

export const useEntitiesView = (): UseEntitiesViewProps => {
  const { onChange, value } = useToggleButtonGroup<VIEW_TYPE>(VIEW_TYPE.TABLE);
  const { config } = useConfig();
  const { enableEntitiesView = false } = config;
  const disabled = !enableEntitiesView;
  const isTableView = value === VIEW_TYPE.TABLE;
  return {
    onChange,
    viewStatus: { disabled, isTableView },
  };
};

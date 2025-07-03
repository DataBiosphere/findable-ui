import { useConfig } from "../../../../../../hooks/useConfig";
import { useToggleButtonGroup } from "../../../../../common/ToggleButtonGroup/hooks/UseToggleButtonGroup/hook";
import { UseEntityViewProps, VIEW_MODE } from "./types";

export const useEntityView = (): UseEntityViewProps => {
  const { onChange, value } = useToggleButtonGroup<VIEW_MODE>(VIEW_MODE.TABLE);
  const { config } = useConfig();
  const { enableEntitiesView = false } = config;
  const disabled = !enableEntitiesView;
  return {
    onChange,
    viewMode: value,
    viewStatus: { disabled },
  };
};

import { useConfig } from "../../../../../../../../../hooks/useConfig";
import { useToggleButtonGroup } from "../../../../../../../../common/ToggleButtonGroup/hooks/UseToggleButtonGroup/hook";
import { UseViewToggleProps, VIEW_MODE } from "./types";

/**
 * Manages the entity list view mode, starting with the table view; selecting the current view again leaves it selected.
 * @returns The view mode, its change handler, and the view status, disabled unless the entities view is enabled on the config.
 */
export const useViewToggle = (): UseViewToggleProps => {
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

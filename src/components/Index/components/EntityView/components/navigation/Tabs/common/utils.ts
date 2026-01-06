import { EntityConfig } from "../../../../../../../../config/entities";
import { Tab } from "../../../../../../../common/Tabs/tabs";

/**
 * Returns entity list tabs list for the tabs component.
 * @param entities - Entities config.
 * @returns tabs list.
 */
export function getEntityListTabs(entities: EntityConfig[]): Tab[] {
  return entities.map(
    ({
      annotation,
      label,
      route,
      tabIcon: icon,
      tabIconPosition: iconPosition,
    }) => ({
      annotation,
      icon,
      iconPosition,
      label,
      value: route,
    }),
  );
}

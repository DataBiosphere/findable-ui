import { EntityConfig } from "../../../../../../../config/entities";
import { Tab } from "../../../../../../common/Tabs/tabs";

/**
 * Returns entity list tabs list for the tabs component.
 * @param entities - Entities config.
 * @returns tabs list.
 */
export function getEntityListTabs(entities: EntityConfig[]): Tab[] {
  return entities.reduce(
    (
      acc: Tab[],
      {
        annotation,
        label,
        listView: { enableTab = true } = {},
        route,
        tabIcon: icon,
        tabIconPosition: iconPosition,
      }
    ) => {
      if (enableTab) {
        acc.push({
          annotation,
          icon,
          iconPosition,
          label,
          value: route,
        });
      }
      return acc;
    },
    []
  );
}

import { useRouter } from "next/router";
import React from "react";
import { PARAMS_INDEX_UUID } from "../../common/constants";
import { Tab, Tabs, TabValue } from "../../components/common/Tabs/tabs";
import { ComponentCreator } from "../../components/ComponentCreator/ComponentCreator";
import { Detail as DetailView } from "../../components/Detail/detail";
import { EntityConfig } from "../../config/entities";
import { useConfig } from "../../hooks/useConfig";
import { useCurrentDetailTab } from "../../hooks/useCurrentDetailTab";
import { useFetchEntity } from "../../hooks/useFetchEntity";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- this data type can't be determined beforehand
export interface EntityDetailViewProps<T = any> {
  data?: T;
  entityListType: string;
}

/**
 * Returns tabs to be used as a prop for the Tabs component.
 * @param entity - Entity config related to the /explore/projects route.
 * @returns tabs list.
 */
function getTabs(entity: EntityConfig): Tab[] {
  return entity.detail.tabs.map(({ label, route }) => ({
    label,
    value: route,
  }));
}

export const EntityDetailView = (props: EntityDetailViewProps): JSX.Element => {
  const { currentTab, route: tabRoute } = useCurrentDetailTab();
  const { isLoading, response } = useFetchEntity(props);
  const { push, query } = useRouter();
  const { entityConfig } = useConfig();
  const { mainColumn, sideColumn } = currentTab;
  const { detail, route: entityRoute } = entityConfig;
  const { detailOverviews, top } = detail;
  const uuid = query.params?.[PARAMS_INDEX_UUID];
  const isDetailOverview = detailOverviews?.includes(currentTab.label);
  const tabs = getTabs(entityConfig);

  if (isLoading) {
    return <span></span>; //TODO: return the loading UI component
  }

  /**
   * Callback fired when selected tab value changes.
   * - Executes a pushState.
   * @param tabValue - Selected tab value.
   */
  const onTabChange = (tabValue: TabValue): void => {
    push(`/${entityRoute}/${uuid}/${tabValue}`);
  };

  return (
    <DetailView
      isDetailOverview={isDetailOverview}
      mainColumn={
        <ComponentCreator components={mainColumn} response={response} />
      }
      sideColumn={
        sideColumn ? (
          <ComponentCreator components={sideColumn} response={response} />
        ) : undefined
      }
      Tabs={<Tabs onTabChange={onTabChange} tabs={tabs} value={tabRoute} />}
      top={<ComponentCreator components={top} response={response} />}
    />
  );
};

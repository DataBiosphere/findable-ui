import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { PARAMS_INDEX_UUID } from "../../common/constants";
import { Tab, Tabs, TabValue } from "../../components/common/Tabs/tabs";
import { ComponentCreator } from "../../components/ComponentCreator/ComponentCreator";
import { Detail as DetailView } from "../../components/Detail/detail";
import { EntityConfig } from "../../config/entities";
import { useConfig } from "../../hooks/useConfig";
import { useCurrentDetailTab } from "../../hooks/useCurrentDetailTab";
import { useEntityHeadTitle } from "../../hooks/useEntityHeadTitle";
import { useFetchEntity } from "../../hooks/useFetchEntity";
import { useUpdateURLCatalogParams } from "../../hooks/useUpdateURLCatalogParam";

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
  return entity.detail.tabs.map(
    ({ label, route, tabIcon: icon, tabIconPosition: iconPosition }) => ({
      icon,
      iconPosition,
      label,
      value: route,
    }),
  );
}

export const EntityDetailView = (props: EntityDetailViewProps): JSX.Element => {
  useUpdateURLCatalogParams();
  const { currentTab, route: tabRoute } = useCurrentDetailTab();
  const { response } = useFetchEntity(props);
  const { push, query } = useRouter();
  const { entityConfig } = useConfig();
  const { mainColumn, sideColumn } = currentTab;
  const { detail, hideTabs, route: entityRoute } = entityConfig;
  const { detailOverviews, top } = detail;
  const uuid = query.params?.[PARAMS_INDEX_UUID];
  const isDetailOverview = detailOverviews?.includes(currentTab.label);
  const tabs = hideTabs ? [] : getTabs(entityConfig);
  const title = useEntityHeadTitle(response);

  if (!response) {
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
    <Fragment>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
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
        Tabs={
          hideTabs ? (
            <></>
          ) : (
            <Tabs onTabChange={onTabChange} tabs={tabs} value={tabRoute} />
          )
        }
        top={<ComponentCreator components={top} response={response} />}
      />
    </Fragment>
  );
};

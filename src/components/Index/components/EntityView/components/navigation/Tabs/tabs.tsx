import Router from "next/router";
import { JSX, useCallback, useMemo } from "react";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { useExploreState } from "../../../../../../../hooks/useExploreState";
import { TabValue } from "../../../../../../common/Tabs/tabs";
import { getEntityListTabs } from "./common/utils";
import { StyledTabs } from "./tabs.styles";

/**
 * Entity list tabs, one per configured entity, with the explore state's tab value selected. Changing tab navigates to the entity's route.
 * @returns The tabs, or null when tabs are not enabled on the entity's UI config.
 */
export const Tabs = (): JSX.Element | null => {
  const { config, entityConfig } = useConfig();
  const { exploreState } = useExploreState();
  const { entities } = config;
  const { tabValue } = exploreState;
  const { ui } = entityConfig;
  const { enableTabs } = ui || {};

  // Builds the tabs.
  const tabs = useMemo(() => getEntityListTabs(entities), [entities]);

  const onTabChange = useCallback(async (tabValue: TabValue): Promise<void> => {
    await Router.push(`/${tabValue}`);
  }, []);

  // Returns null if tabs are disabled.
  if (!enableTabs) return null;

  return <StyledTabs onTabChange={onTabChange} tabs={tabs} value={tabValue} />;
};

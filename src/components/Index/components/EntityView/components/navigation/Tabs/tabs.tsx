import Router from "next/router";
import { JSX, useCallback, useMemo } from "react";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { useExploreState } from "../../../../../../../hooks/useExploreState";
import { TabValue } from "../../../../../../common/Tabs/tabs";
import { getEntityListTabs } from "./common/utils";
import { StyledTabs } from "./tabs.styles";

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

import Router from "next/router";
import React, { useCallback, useMemo } from "react";
import { useConfig } from "../../../../../../hooks/useConfig";
import { useExploreState } from "../../../../../../hooks/useExploreState";
import { TabValue } from "../../../../../common/Tabs/tabs";
import { getEntityListTabs } from "./common/utils";
import { StyledTabs } from "./tabs.styles";

export const Tabs = (): JSX.Element | null => {
  const { config } = useConfig();
  const { exploreState } = useExploreState();
  const { entities } = config;
  const { tabValue } = exploreState;
  const tabs = useMemo(() => getEntityListTabs(entities), [entities]);

  // Callback fired when selected tab value changes.
  const onTabChange = useCallback(async (tabValue: TabValue): Promise<void> => {
    await Router.push(`/${tabValue}`);
  }, []);

  if (tabs.length <= 1) return null;

  return <StyledTabs onTabChange={onTabChange} tabs={tabs} value={tabValue} />;
};

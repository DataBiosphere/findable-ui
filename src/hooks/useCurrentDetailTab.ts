import { useRouter } from "next/router";
import { PARAMS_INDEX_TAB } from "../common/constants";
import { BackPageTabConfig } from "../config/entities";
import { useConfig } from "./useConfig";

/**
 * Model of current selected tab and the tab's corresponding route in the set of tabs.
 */
export interface CurrentDetailTab {
  currentTab: BackPageTabConfig;
  route: string;
}

/**
 * Hook to get the current tab and its route that will be used to create the detail page.
 * @returns Current tab and current tab route.
 */
export const useCurrentDetailTab = (): CurrentDetailTab => {
  const router = useRouter();
  const { entityConfig } = useConfig();
  const { detail } = entityConfig;
  const { tabs } = detail;
  const tabRoute = router.query.params?.[PARAMS_INDEX_TAB] ?? "";
  const currentTab = tabs.find(({ route }) => route === tabRoute) || tabs[0];
  return {
    currentTab,
    route: tabRoute,
  };
};

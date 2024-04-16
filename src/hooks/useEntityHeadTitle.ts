import { useMemo } from "react";
import { TabConfig } from "../config/entities";
import { useConfig } from "./useConfig";
import { useCurrentDetailTab } from "./useCurrentDetailTab";

/**
 * Returns dynamically generated title for use in the <Head> component.
 * The title combines the entity title, current tab name, and application title, if available.
 * @param response - Entity response.
 * @returns dynamically generated title for use in the <Head> component.
 */
export const useEntityHeadTitle = <T>(response: T): string | undefined => {
  const { config, entityConfig } = useConfig();
  const { currentTab } = useCurrentDetailTab();
  const { appTitle } = config;
  const { getTitle: getEntityTitle } = entityConfig;
  // Get the tab name from the current tab.
  const tabName = getTabName(currentTab);
  // Get the entity title from the response.
  const entityTitle = getEntityTitle?.(response);

  return useMemo(
    () => getTitle(appTitle, tabName, entityTitle),
    [appTitle, tabName, entityTitle]
  );
};

/**
 * Returns the tab name as a string for the current tab, from the given tab configuration.
 * For the case where tab label is not a string, default to tab name.
 * @param tab - Tab configuration.
 * @returns tab name.
 */
function getTabName(tab: TabConfig): string | undefined {
  const { label, tabName } = tab;
  return typeof label === "string" ? label : tabName;
}

/**
 * Returns the full title string for the <Head> element by combining the app title, tab name, and entity title.
 * @param appTitle - App title.
 * @param tabName - Tab name.
 * @param entityTitle - Entity title.
 * @returns full title string for the <Head> element.
 */
function getTitle(
  appTitle: string,
  tabName?: string,
  entityTitle?: string
): string | undefined {
  const titles = [];
  if (entityTitle) {
    titles.push(entityTitle);
  }
  if (tabName) {
    titles.push(tabName);
  }
  if (titles.length > 0) {
    titles.push(appTitle);
    return titles.join(" - ");
  }
}

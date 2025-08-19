import React, { useEffect, useMemo } from "react";
import { AzulEntitiesStaticResponse } from "../../apis/azul/common/entities";
import { track } from "../../common/analytics/analytics";
import { EVENT_NAME, EVENT_PARAM } from "../../common/analytics/entities";
import { CategoryView, VIEW_KIND } from "../../common/categories/views/types";
import { CategoryKey, CategoryValueKey } from "../../common/entities";
import { DrawerProvider } from "../../components/common/Drawer/provider/provider";
import { ClearAllFilters } from "../../components/Filter/components/ClearAllFilters/clearAllFilters";
import {
  CategoryFilter,
  Filters,
} from "../../components/Filter/components/Filters/filters";
import { SearchAllFilters } from "../../components/Filter/components/SearchAllFilters/searchAllFilters";
import { SURFACE_TYPE } from "../../components/Filter/components/surfaces/types";
import { Index as IndexView } from "../../components/Index/index";
import { SidebarLabel } from "../../components/Layout/components/Sidebar/components/SidebarLabel/sidebarLabel";
import { SidebarTools } from "../../components/Layout/components/Sidebar/components/SidebarTools/sidebarTools.styles";
import { Sidebar } from "../../components/Layout/components/Sidebar/sidebar";
import { CategoryGroup } from "../../config/entities";
import { useStateSyncManager } from "../../hooks/stateSyncManager/hook";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useConfig } from "../../hooks/useConfig";
import { useEntityList } from "../../hooks/useEntityList";
import { useExploreState } from "../../hooks/useExploreState";
import { ExploreActionKind } from "../../providers/exploreState";
import { clearMeta } from "../../providers/exploreState/actions/clearMeta/dispatch";
import { stateToUrl } from "../../providers/exploreState/actions/stateToUrl/dispatch";
import { urlToState } from "../../providers/exploreState/actions/urlToState/dispatch";
import { SELECT_CATEGORY_KEY } from "../../providers/exploreState/constants";
import { TEST_IDS } from "../../tests/testIds";
import { buildStateSyncManagerContext } from "./utils";

export interface ExploreViewProps extends AzulEntitiesStaticResponse {
  className?: string;
}

export const ExploreView = (props: ExploreViewProps): JSX.Element => {
  const { mdDown } = useBreakpoint();
  const { config, entityConfig } = useConfig(); // Get app level config.
  const { exploreDispatch, exploreState } = useExploreState(); // Get the useReducer state and dispatch for "Explore".
  const { trackingConfig } = config;
  const { label } = entityConfig;
  const { categoryGroups, categoryViews, loading } = exploreState;
  useEntityList(props); // Fetch entities.
  const { entityListType } = props;
  const categoryFilters = useMemo(
    () => buildCategoryFilters(categoryViews, categoryGroups),
    [categoryGroups, categoryViews]
  );

  /**
   * State sync manager.
   * Handles state synchronization between the explore state and the URL.
   */
  useStateSyncManager({
    actions: { clearMeta, stateToUrl, urlToState },
    dispatch: exploreDispatch,
    state: buildStateSyncManagerContext(exploreState, props),
  });

  /**
   * Callback fired when selected state of a category value is toggled.
   * @param fromSearchAll - Indication if the filter was originated from the search all field.
   * @param categoryKey - The category being filtered.
   * @param selectedCategoryValue - The value to set or clear.
   * @param selected - Indication of whether the selected value is being set or cleared.
   * @param categorySection - Name of group the category is in.
   * @param viewKind - View kind.
   * @param searchTerm - Search term used to find the value.
   */
  const onFilterChange = (
    fromSearchAll: boolean,
    categoryKey: CategoryKey,
    selectedCategoryValue: CategoryValueKey,
    selected: boolean,
    categorySection?: string,
    viewKind?: VIEW_KIND,
    searchTerm?: string
  ): void => {
    const dispatchType =
      categoryKey === SELECT_CATEGORY_KEY.SAVED_FILTERS
        ? ExploreActionKind.ApplySavedFilter
        : ExploreActionKind.UpdateFilter;

    exploreDispatch({
      payload: {
        categoryKey,
        selected,
        selectedValue: selectedCategoryValue,
        viewKind,
      },
      type: dispatchType,
    });

    trackingConfig?.trackFilterApplied?.({
      category: categoryKey,
      fromSearchAll,
      searchTerm: searchTerm ?? "",
      section: categorySection ?? "",
      selected,
      value: selectedCategoryValue,
    });

    // Execute GTM tracking.
    if (selected) {
      track(EVENT_NAME.FILTER_SELECTED, {
        [EVENT_PARAM.FILTER_NAME]: categoryKey,
        [EVENT_PARAM.FILTER_VALUE]: String(selectedCategoryValue),
      });
    }
  };

  /**
   * Dispatch a SelectedEntityType action when entityListType changes.
   */
  useEffect(() => {
    if (entityListType) {
      exploreDispatch({
        payload: entityListType,
        type: ExploreActionKind.SelectEntityType,
      });
      track(EVENT_NAME.ENTITY_SELECTED, {
        [EVENT_PARAM.ENTITY_NAME]: entityListType,
      });
    }
  }, [entityListType, exploreDispatch]);

  return (
    <DrawerProvider>
      {categoryViews && !!categoryViews.length && (
        <Sidebar>
          <SidebarTools data-testid={TEST_IDS.FILTER_CONTROLS}>
            <SidebarLabel label={"Filters"} />
            <ClearAllFilters />
            <SearchAllFilters
              categoryViews={categoryViews}
              onFilter={onFilterChange.bind(null, true)}
              surfaceType={
                mdDown ? SURFACE_TYPE.POPPER_DRAWER : SURFACE_TYPE.POPPER_MENU
              }
            />
          </SidebarTools>
          <Filters
            categoryFilters={categoryFilters}
            onFilter={onFilterChange.bind(null, false)}
            surfaceType={mdDown ? SURFACE_TYPE.DRAWER : SURFACE_TYPE.MENU}
            trackFilterOpened={trackingConfig?.trackFilterOpened}
          />
        </Sidebar>
      )}
      <IndexView
        className={props.className}
        categoryFilters={categoryFilters}
        entityListType={entityListType}
        entityName={label}
        loading={loading}
      />
    </DrawerProvider>
  );
};

/**
 * Builds the category views into category views grouped by the given category group configuration.
 * @param categoryViews - View models of categories to display.
 * @param categoryGroups - Category groups.
 * @returns category filters.
 */
function buildCategoryFilters(
  categoryViews: CategoryView[],
  categoryGroups?: CategoryGroup[]
): CategoryFilter[] {
  if (!categoryGroups) {
    return [{ categoryViews }];
  }
  return categoryGroups.reduce((accGroups, { categoryConfigs, label }) => {
    // Grab the category views for the configured grouped categories.
    const views = categoryConfigs.reduce((accViews, { key: categoryKey }) => {
      const categoryView = categoryViews.find(({ key }) => key === categoryKey);
      if (categoryView) {
        accViews.push(categoryView);
      }
      return accViews;
    }, [] as CategoryView[]);
    if (views.length > 0) {
      accGroups.push({ categoryViews: views, label });
    }
    return accGroups;
  }, [] as CategoryFilter[]);
}

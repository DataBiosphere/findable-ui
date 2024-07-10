import React, { useEffect, useMemo, useState } from "react";
import {
  AzulEntitiesStaticResponse,
  AzulSummaryResponse,
} from "../../apis/azul/common/entities";
import { track } from "../../common/analytics/analytics";
import { EVENT_NAME, EVENT_PARAM } from "../../common/analytics/entities";
import {
  CategoryKey,
  CategoryValueKey,
  SelectCategoryView,
} from "../../common/entities";
import { ComponentCreator } from "../../components/ComponentCreator/ComponentCreator";
import { ClearAllFilters } from "../../components/Filter/components/ClearAllFilters/clearAllFilters";
import {
  CategoryFilter,
  Filters,
} from "../../components/Filter/components/Filters/filters";
import { SearchAllFilters } from "../../components/Filter/components/SearchAllFilters/searchAllFilters";
import { Tabs } from "../../components/Index/components/Tabs/tabs";
import { Index as IndexView } from "../../components/Index/index";
import { SidebarButton } from "../../components/Layout/components/Sidebar/components/SidebarButton/sidebarButton";
import { SidebarLabel } from "../../components/Layout/components/Sidebar/components/SidebarLabel/sidebarLabel";
import { SidebarTools } from "../../components/Layout/components/Sidebar/components/SidebarTools/sidebarTools.styles";
import { Sidebar } from "../../components/Layout/components/Sidebar/sidebar";
import { TableCreator } from "../../components/TableCreator/tableCreator";
import {
  CategoryGroup,
  ComponentsConfig,
  EntityConfig,
  SummaryConfig,
} from "../../config/entities";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../hooks/useBreakpointHelper";
import { useConfig } from "../../hooks/useConfig";
import { useEntityList } from "../../hooks/useEntityList";
import { useExploreState } from "../../hooks/useExploreState";
import { useSummary } from "../../hooks/useSummary";
import { ExploreActionKind, ExploreState } from "../../providers/exploreState";
import { SELECT_CATEGORY_KEY } from "../../providers/exploreState/constants";
import { DESKTOP_SM } from "../../theme/common/breakpoints";

export interface ExploreViewProps extends AzulEntitiesStaticResponse {
  className?: string;
}

export const ExploreView = (props: ExploreViewProps): JSX.Element => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const tabletDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, DESKTOP_SM);
  const { config, entityConfig } = useConfig(); // Get app level config.
  const { exploreDispatch, exploreState } = useExploreState(); // Get the useReducer state and dispatch for "Explore".
  const { explorerTitle, summaryConfig, trackingConfig } = config;
  const { listView } = entityConfig;
  const { listHero, subTitleHero } = listView || {};
  const { categoryGroups, categoryViews, filterCount } = exploreState;
  const { response: summaryResponse } = useSummary(); // Fetch summary.
  useEntityList(props); // Fetch entities.
  const { entityListType } = props;
  const categoryFilters = useMemo(
    () => buildCategoryFilters(categoryViews, categoryGroups),
    [categoryGroups, categoryViews]
  );

  /**
   * Closes filter drawer.
   */
  const onCloseDrawer = (): void => {
    setIsDrawerOpen(false);
  };

  /**
   * Callback fired when selected state of a category value is toggled.
   * @param fromSearchAll - Indication if the filter was originated from the search all field.
   * @param categoryKey - The category being filtered.
   * @param selectedCategoryValue - The value to set or clear.
   * @param selected - Indication of whether the selected value is being set or cleared.
   * @param categorySection - Name of group the category is in.
   * @param searchTerm - Search term used to find the value.
   */
  const onFilterChange = (
    fromSearchAll: boolean,
    categoryKey: CategoryKey,
    selectedCategoryValue: CategoryValueKey,
    selected: boolean,
    categorySection?: string,
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
        [EVENT_PARAM.FILTER_VALUE]: selectedCategoryValue,
      });
    }
  };

  /**
   * Opens filter drawer.
   */
  const onOpenDrawer = (): void => {
    setIsDrawerOpen(true);
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
    <>
      {categoryViews && !!categoryViews.length && (
        <Sidebar drawerOpen={isDrawerOpen} onDrawerClose={onCloseDrawer}>
          <SidebarTools>
            <SidebarLabel label={"Filters"} />
            <ClearAllFilters />
            <SearchAllFilters
              categoryViews={categoryViews}
              drawerOpen={isDrawerOpen}
              onFilter={onFilterChange.bind(null, true)}
            />
          </SidebarTools>
          <Filters
            categoryFilters={categoryFilters}
            closeAncestor={onCloseDrawer}
            onFilter={onFilterChange.bind(null, false)}
            trackFilterOpened={trackingConfig?.trackFilterOpened}
          />
        </Sidebar>
      )}
      <IndexView
        className={props.className}
        List={renderList(exploreState, entityConfig, entityListType)}
        ListHero={renderComponent(listHero)}
        SideBarButton={
          tabletDown ? (
            <SidebarButton
              count={filterCount}
              label="Filter"
              onClick={onOpenDrawer}
            />
          ) : undefined
        }
        SubTitleHero={renderComponent(subTitleHero)}
        Summaries={renderSummary(summaryConfig, summaryResponse)}
        Tabs={<Tabs />}
        title={entityConfig.explorerTitle || explorerTitle}
      />
    </>
  );
};

/**
 * Builds the category views into category views grouped by the given category group configuration.
 * @param selectCategoryViews - View models of categories to display.
 * @param categoryGroups - Category groups.
 * @returns category filters.
 */
function buildCategoryFilters(
  selectCategoryViews: SelectCategoryView[],
  categoryGroups?: CategoryGroup[]
): CategoryFilter[] {
  if (!categoryGroups) {
    return [{ categoryViews: selectCategoryViews }];
  }
  return categoryGroups.reduce((accGroups, { categoryConfigs, label }) => {
    // Grab the category views for the configured grouped categories.
    const categoryViews = categoryConfigs.reduce(
      (accViews, { key: categoryKey }) => {
        const categoryView = selectCategoryViews.find(
          ({ key }) => key === categoryKey
        );
        if (categoryView) {
          accViews.push(categoryView);
        }
        return accViews;
      },
      [] as SelectCategoryView[]
    );
    if (categoryViews.length > 0) {
      accGroups.push({ categoryViews, label });
    }
    return accGroups;
  }, [] as CategoryFilter[]);
}

/**
 * Optionally renders component config.
 * @param componentsConfig - SubHero config.
 * @param response - Response data.
 * @returns components.
 */
function renderComponent<T>(
  componentsConfig?: ComponentsConfig | undefined,
  response?: T
): JSX.Element | undefined {
  if (!componentsConfig) {
    return;
  }
  return <ComponentCreator components={componentsConfig} response={response} />;
}

/**
 * Render either a loading view, empty result set notification or the table itself.
 * @param exploreState - ExploreView responses from Azul, such as projects (index/projects), samples (index/samples) and files (index/files).
 * @param entityConfig - Entity configuration.
 * @param entityListType - Entity list type.
 * @returns rendered Table component.
 */
function renderList(
  exploreState: ExploreState,
  entityConfig: EntityConfig,
  entityListType: string
): JSX.Element {
  const { listItems, loading, tabValue } = exploreState;
  const { getId: getRowId, list, listView } = entityConfig;
  const { columns: columnsConfig, defaultSort } = list;

  if (!exploreState || !tabValue) {
    return <></>; //TODO: return the loading UI component
  }

  if (entityListType !== tabValue) {
    // required currently for client-side fetching as the pre-rendered page
    // loads with the previous tabs data on the first render after switching tabs. (or similar)
    return <></>;
  }

  return (
    <TableCreator
      columns={columnsConfig}
      defaultSort={defaultSort}
      getRowId={getRowId}
      items={listItems ?? []}
      listView={listView}
      loading={loading}
    />
  );
}

/**
 * Renders Summaries component when all the following requirements are fulfilled:
 * - defined summary config,
 * - valid summary response, and
 * - defined summaries transformed from the given summary response.
 * @param summaryConfig - Summary config.
 * @param summaryResponse - Response model return from summary API.
 * @returns rendered Summaries component.
 */
function renderSummary(
  summaryConfig?: SummaryConfig,
  summaryResponse?: AzulSummaryResponse
): JSX.Element | undefined {
  if (!summaryConfig || !summaryResponse) {
    return;
  }
  /* Render the Summaries component. */
  return (
    <ComponentCreator
      components={summaryConfig.components}
      response={summaryResponse}
    />
  );
}

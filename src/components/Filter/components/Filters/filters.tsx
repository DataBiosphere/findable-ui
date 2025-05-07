import { Divider } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { isRangeCategoryView } from "../../../../common/categories/views/range/typeGuards";
import { CategoryView } from "../../../../common/categories/views/types";
import { CategoryTag } from "../../../../common/entities";
import { TrackFilterOpenedFunction } from "../../../../config/entities";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { useWindowResize } from "../../../../hooks/useWindowResize";
import { TEST_IDS } from "../../../../tests/testIds";
import { DESKTOP_SM } from "../../../../theme/common/breakpoints";
import { Filter } from "../Filter/filter";
import { buildRangeTag } from "../FilterTag/utils";
import { FilterTags } from "../FilterTags/filterTags";
import { CategoryViewsLabel, Filters as FilterList } from "./filters.styles";

export interface CategoryFilter {
  categoryViews: CategoryView[];
  label?: string;
}

export interface FiltersProps {
  categoryFilters: CategoryFilter[];
  closeAncestor?: () => void;
  disabled?: boolean; // Global disabling of filters.
  onFilter: OnFilterFn;
  trackFilterOpened?: TrackFilterOpenedFunction;
}

/**
 * Returns filter tags for the given category view.
 * @param categoryView - View model of category to display.
 * @param onFilter - Function to execute on selection or removal of category value.
 * @returns Array of filter tags.
 */
function buildFilterTags(
  categoryView: CategoryView,
  onFilter: OnFilterFn
): CategoryTag[] {
  // Handle range category views
  if (isRangeCategoryView(categoryView)) {
    return buildRangeTag(categoryView, onFilter);
  }

  // Handle select category views.
  const { key: categoryKey, values } = categoryView;
  return values
    .filter(({ selected }) => selected)
    .map(({ key: categoryValueKey, label, selected }) => {
      return {
        label: label,
        onRemove: () => onFilter(categoryKey, categoryValueKey, !selected),
        superseded: false,
      };
    });
}

/**
 * Returns filter tags element for the given category view.
 * @param categoryView - View model of category to display.
 * @param onFilter - Function to execute on selection or removal of category value.
 * @returns Filter tags element.
 */
function renderFilterTags(
  categoryView: CategoryView,
  onFilter: OnFilterFn
): JSX.Element {
  const tags = buildFilterTags(categoryView, onFilter);
  return <FilterTags tags={tags} />;
}

export const Filters = ({
  categoryFilters,
  closeAncestor,
  disabled = false,
  onFilter,
  trackFilterOpened,
}: FiltersProps): JSX.Element => {
  const isFilterDrawer = useBreakpointHelper(
    BREAKPOINT_FN_NAME.DOWN,
    DESKTOP_SM
  );
  const { height: windowHeight } = useWindowResize();
  const filterListRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setHeight(calculateListHeight(windowHeight, filterListRef.current));
  }, [windowHeight]);

  return (
    <FilterList
      data-testid={TEST_IDS.FILTERS}
      disabled={disabled}
      height={height}
      ref={filterListRef}
    >
      {categoryFilters.map(({ categoryViews, label }, i) => (
        <Fragment key={i}>
          {i !== 0 && <Divider />}
          {label && <CategoryViewsLabel>{label}</CategoryViewsLabel>}
          {categoryViews.map((categoryView) => (
            <Filter
              key={categoryView.key}
              categorySection={label}
              categoryView={categoryView}
              closeAncestor={closeAncestor}
              isFilterDrawer={isFilterDrawer}
              onFilter={onFilter}
              trackFilterOpened={trackFilterOpened}
              tags={renderFilterTags(categoryView, onFilter)}
            />
          ))}
        </Fragment>
      ))}
    </FilterList>
  );
};

/**
 * Returns given height of filter list.
 * @param windowHeight - Window height.
 * @param filterListEl - Filter list element.
 * @returns calculated height.
 */
function calculateListHeight(
  windowHeight: number,
  filterListEl: HTMLDivElement | null
): number {
  return windowHeight - (filterListEl?.getBoundingClientRect()?.top ?? 0);
}

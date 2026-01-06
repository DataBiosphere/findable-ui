import { Divider } from "@mui/material";
import { JSX, Fragment, useEffect, useRef, useState } from "react";
import { isRangeCategoryView } from "../../../../common/categories/views/range/typeGuards";
import { CategoryView } from "../../../../common/categories/views/types";
import { CategoryTag } from "../../../../common/entities";
import { TrackFilterOpenedFunction } from "../../../../config/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { useWindowResize } from "../../../../hooks/useWindowResize";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { TEST_IDS } from "../../../../tests/testIds";
import { useDrawer } from "../../../common/Drawer/provider/hook";
import { BaseComponentProps } from "../../../types";
import { Filter } from "../Filter/filter";
import { buildRangeTag } from "../FilterTag/utils";
import { FilterTags } from "../FilterTags/filterTags";
import { SURFACE_TYPE } from "../surfaces/types";
import { Filters as FilterList, StyledTypography } from "./filters.styles";

export interface CategoryFilter {
  categoryViews: CategoryView[];
  label?: string;
}

export interface FiltersProps extends BaseComponentProps {
  categoryFilters: CategoryFilter[];
  disabled?: boolean; // Global disabling of filters.
  onFilter: OnFilterFn;
  surfaceType?: SURFACE_TYPE;
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
  onFilter: OnFilterFn,
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
  onFilter: OnFilterFn,
): JSX.Element {
  const tags = buildFilterTags(categoryView, onFilter);
  return <FilterTags tags={tags} />;
}

export const Filters = ({
  categoryFilters,
  className,
  disabled = false,
  onFilter,
  surfaceType = SURFACE_TYPE.MENU,
  trackFilterOpened,
}: FiltersProps): JSX.Element => {
  const { onClose } = useDrawer();
  const { height: windowHeight } = useWindowResize();
  const filterListRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setHeight(calculateListHeight(windowHeight, filterListRef.current));
  }, [windowHeight]);

  return (
    <FilterList
      className={className}
      data-testid={TEST_IDS.FILTERS}
      disabled={disabled}
      height={height}
      ref={filterListRef}
      surfaceType={surfaceType}
    >
      {categoryFilters.map(({ categoryViews, label }, i) => (
        <Fragment key={i}>
          {i !== 0 && <Divider />}
          {label && (
            <StyledTypography
              color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
              component="div"
              variant={TYPOGRAPHY_PROPS.VARIANT.UPPERCASE_500}
            >
              {label}
            </StyledTypography>
          )}
          {categoryViews.map((categoryView) => (
            <Filter
              key={categoryView.key}
              categorySection={label}
              categoryView={categoryView}
              closeAncestor={onClose}
              onFilter={onFilter}
              surfaceType={surfaceType}
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
  filterListEl: HTMLDivElement | null,
): number {
  return windowHeight - (filterListEl?.getBoundingClientRect()?.top ?? 0);
}

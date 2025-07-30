import { Grow, PopoverPosition, PopoverProps } from "@mui/material";
import React, { MouseEvent, ReactNode, useState } from "react";
import { isRangeCategoryView } from "../../../../common/categories/views/range/typeGuards";
import { CategoryView } from "../../../../common/categories/views/types";
import { TrackFilterOpenedFunction } from "../../../../config/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { TEST_IDS } from "../../../../tests/testIds";
import { FilterLabel } from "../FilterLabel/filterLabel";
import { FilterMenu } from "../FilterMenu/filterMenu";
import { FilterRange } from "../FilterRange/filterRange";
import { IconButton } from "../surfaces/drawer/components/IconButton/iconButton";
import { SURFACE_TYPE } from "../surfaces/types";
import { DrawerTransition } from "./components/DrawerTransition/drawerTransition";
import { StyledPopover } from "./filter.styles";

/**
 * Filter component.
 * TODO(cc) refactor: build tags from categoryView for selected values.
 * TODO(cc) tests: add tests for selected values (rending of tags) for select and range categories.
 */

const DEFAULT_POSITION: PopoverPosition = { left: 0, top: 0 };
const DEFAULT_SLOT_PROPS: PopoverProps["slotProps"] = {
  paper: { variant: "menu" },
};
const DRAWER_SLOT_PROPS: PopoverProps["slotProps"] = {
  paper: { elevation: 0 },
};

export interface FilterProps {
  categorySection?: string;
  categoryView: CategoryView;
  closeAncestor?: () => void;
  onFilter: OnFilterFn;
  surfaceType: SURFACE_TYPE;
  tags?: ReactNode; // e.g. filter tags
  trackFilterOpened?: TrackFilterOpenedFunction;
}

export const Filter = ({
  categorySection,
  categoryView,
  closeAncestor,
  onFilter,
  surfaceType,
  tags,
  trackFilterOpened,
}: FilterProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<PopoverPosition>(DEFAULT_POSITION);
  const isDrawer = surfaceType === SURFACE_TYPE.DRAWER;
  const anchorPosition = isDrawer ? DEFAULT_POSITION : position;
  const slotProps = isDrawer ? DRAWER_SLOT_PROPS : DEFAULT_SLOT_PROPS;
  const TransitionComponent = isDrawer ? DrawerTransition : Grow;
  const transitionDuration = isOpen ? 250 : 300;
  const TransitionDuration = isDrawer ? transitionDuration : undefined;
  const isRangeView = isRangeCategoryView(categoryView);

  /**
   * Closes filter popover.
   */
  const onCloseFilter = (): void => {
    setIsOpen(false);
  };

  /**
   * Closes filter and all open ancestors e.g. filter drawer.
   */
  const onCloseFilters = (): void => {
    closeAncestor?.();
    onCloseFilter();
  };

  /**
   * Opens filter popover and sets popover position.
   * @param event - Mouse event interaction with filter target.
   */
  const onOpenFilter = (event: MouseEvent<HTMLButtonElement>): void => {
    // Grab the filter target size and position and calculate the popover position.
    const targetDOMRect = event.currentTarget.getBoundingClientRect();
    const popoverLeftPos = targetDOMRect.x;
    const popoverTopPos = targetDOMRect.y + targetDOMRect.height - 1;
    // Set popover position and open state.
    setPosition({ left: popoverLeftPos, top: popoverTopPos });
    setIsOpen(true);
    trackFilterOpened?.({ category: categoryView.key });
  };

  return (
    <>
      <FilterLabel
        annotation={categoryView.annotation}
        count={isRangeView ? undefined : categoryView.values.length}
        disabled={categoryView.isDisabled}
        isOpen={isOpen}
        label={categoryView.label}
        onClick={onOpenFilter}
        surfaceType={surfaceType}
      />
      <StyledPopover
        anchorPosition={anchorPosition}
        anchorReference="anchorPosition"
        data-testid={TEST_IDS.FILTER_POPOVER}
        marginThreshold={0}
        onClose={onCloseFilters}
        open={isOpen}
        slotProps={slotProps}
        slots={{ transition: TransitionComponent }}
        surfaceType={surfaceType}
        transitionDuration={TransitionDuration}
      >
        {isDrawer && <IconButton onClick={onCloseFilters} />}
        {isRangeView ? (
          <FilterRange
            categoryKey={categoryView.key}
            categoryLabel={categoryView.label}
            categorySection={categorySection}
            max={categoryView.max}
            min={categoryView.min}
            selectedMax={categoryView.selectedMax}
            selectedMin={categoryView.selectedMin}
            onCloseFilter={onCloseFilter}
            onFilter={onFilter}
            surfaceType={surfaceType}
            unit={categoryView.unit}
          />
        ) : (
          <FilterMenu
            categoryKey={categoryView.key}
            categoryLabel={categoryView.label}
            categorySection={categorySection}
            onCloseFilter={onCloseFilter}
            onFilter={onFilter}
            surfaceType={surfaceType}
            values={categoryView.values}
          />
        )}
      </StyledPopover>
      {tags}
    </>
  );
};

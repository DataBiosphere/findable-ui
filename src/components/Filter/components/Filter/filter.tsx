import { CloseRounded } from "@mui/icons-material";
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
import { DrawerTransition } from "./components/DrawerTransition/drawerTransition";
import { FilterPopover, IconButton } from "./filter.styles";

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
  isFilterDrawer: boolean;
  onFilter: OnFilterFn;
  tags?: ReactNode; // e.g. filter tags
  trackFilterOpened?: TrackFilterOpenedFunction;
}

export const Filter = ({
  categorySection,
  categoryView,
  closeAncestor,
  isFilterDrawer,
  onFilter,
  tags,
  trackFilterOpened,
}: FilterProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<PopoverPosition>(DEFAULT_POSITION);
  const anchorPosition = isFilterDrawer ? DEFAULT_POSITION : position;
  const slotProps = isFilterDrawer ? DRAWER_SLOT_PROPS : DEFAULT_SLOT_PROPS;
  const TransitionComponent = isFilterDrawer ? DrawerTransition : Grow;
  const transitionDuration = isOpen ? 250 : 300;
  const TransitionDuration = isFilterDrawer ? transitionDuration : undefined;
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
      />
      <FilterPopover
        anchorPosition={anchorPosition}
        anchorReference="anchorPosition"
        data-testid={TEST_IDS.FILTER_POPOVER}
        marginThreshold={0}
        onClose={onCloseFilters}
        open={isOpen}
        slotProps={slotProps}
        slots={{ transition: TransitionComponent }}
        transitionDuration={TransitionDuration}
      >
        {isOpen && isFilterDrawer && (
          <IconButton
            Icon={CloseRounded}
            onClick={onCloseFilters}
            size="medium"
          />
        )}
        {isRangeView ? (
          <FilterRange
            categoryKey={categoryView.key}
            categoryLabel={categoryView.label}
            categorySection={categorySection}
            isFilterDrawer={isFilterDrawer}
            max={categoryView.max}
            min={categoryView.min}
            selectedMax={categoryView.selectedMax}
            selectedMin={categoryView.selectedMin}
            onCloseFilter={onCloseFilter}
            onFilter={onFilter}
            unit={categoryView.unit}
          />
        ) : (
          <FilterMenu
            categoryKey={categoryView.key}
            categoryLabel={categoryView.label}
            categorySection={categorySection}
            isFilterDrawer={isFilterDrawer}
            onCloseFilter={onCloseFilter}
            onFilter={onFilter}
            values={categoryView.values}
          />
        )}
      </FilterPopover>
      {tags}
    </>
  );
};

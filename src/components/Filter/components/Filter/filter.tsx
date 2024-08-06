import { CloseRounded } from "@mui/icons-material";
import { Grow, PopoverPosition, PopoverProps } from "@mui/material";
import React, { MouseEvent, ReactNode, useState } from "react";
import { SelectCategoryView } from "../../../../common/entities";
import { TrackFilterOpenedFunction } from "../../../../config/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { FilterLabel } from "../FilterLabel/filterLabel";
import { FilterMenu } from "../FilterMenu/filterMenu";
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
  categoryView: SelectCategoryView;
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
        count={categoryView.values.length}
        disabled={categoryView.isDisabled}
        label={categoryView.label}
        onClick={onOpenFilter}
      />
      <FilterPopover
        anchorPosition={anchorPosition}
        anchorReference="anchorPosition"
        marginThreshold={0}
        onClose={onCloseFilters}
        open={isOpen}
        slotProps={slotProps}
        TransitionComponent={TransitionComponent}
        transitionDuration={TransitionDuration}
      >
        {isOpen && isFilterDrawer && (
          <IconButton
            Icon={CloseRounded}
            onClick={onCloseFilters}
            size="medium"
          />
        )}
        <FilterMenu
          categorySection={categorySection}
          categoryKey={categoryView.key}
          categoryLabel={categoryView.label}
          isFilterDrawer={isFilterDrawer}
          onFilter={onFilter}
          onCloseFilter={onCloseFilter}
          values={categoryView.values}
        />
      </FilterPopover>
      {tags}
    </>
  );
};

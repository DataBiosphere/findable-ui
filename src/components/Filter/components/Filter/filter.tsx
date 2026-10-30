import { Paper } from "@mui/material";
import { JSX, useId } from "react";
import { isRangeCategoryView } from "../../../../common/categories/views/range/typeGuards";
import { PAPER_PROPS } from "../../../../styles/common/mui/paper";
import { TEST_IDS } from "../../../../tests/testIds";
import { PopperProvider } from "../../../common/Popper/provider/provider";
import { FilterLabel } from "../FilterLabel/filterLabel";
import { FilterMenu } from "../FilterMenu/filterMenu";
import { FilterRange } from "../FilterRange/filterRange";
import { IconButton } from "../surfaces/drawer/components/IconButton/iconButton";
import { SURFACE_TYPE } from "../surfaces/types";
import { Backdrop } from "./components/Backdrop/backdrop";
import { DrawerTransition } from "./components/DrawerTransition/drawerTransition";
import { MenuTransition } from "./components/MenuTransition/menuTransition";
import { POPPER_PROPS } from "./components/Popper/constants";
import { StyledPopper } from "./filter.styles";
import { FilterProps } from "./types";
import { getCloseCategoryLabel, getPopperOptions } from "./utils";

/**
 * Category filter: a label button that opens the category's filter panel, followed by the given tags.
 * The panel is a non-modal dialog over a backdrop, showing a range form for range categories and a menu of values otherwise. In the drawer it slides in with a close button; otherwise it grows as a menu, and the page scrolls beneath it.
 * Closing the panel from the backdrop, with Escape, or with the drawer's close button also invokes closeAncestor.
 * TODO(cc) refactor: build tags from categoryView for selected values.
 * TODO(cc) tests: add tests for selected values (rending of tags) for select and range categories.
 * @param props - Component props.
 * @param props.categorySection - Category section label, passed to onFilter.
 * @param props.categoryView - Category view to filter.
 * @param props.closeAncestor - Function invoked after the panel is closed from the backdrop, with Escape, or with the drawer's close button.
 * @param props.onFilter - Function invoked when a filter value is toggled or a range is submitted.
 * @param props.surfaceType - Filter surface type.
 * @param props.tags - Content rendered after the panel, e.g. filter tags.
 * @param props.trackFilterOpened - Function invoked with the category when the panel is opened.
 * @returns The filter.
 */
export const Filter = ({
  categorySection,
  categoryView,
  closeAncestor,
  onFilter,
  surfaceType,
  tags,
  trackFilterOpened,
}: FilterProps): JSX.Element => {
  const isDrawer = surfaceType === SURFACE_TYPE.DRAWER;
  const isRangeView = isRangeCategoryView(categoryView);
  // Generated per instance: one Filter renders per category, and the drawer and
  // sidebar surfaces can both be mounted at once.
  const panelId = useId();
  return (
    <PopperProvider>
      {({ anchorEl, onClose, onOpen, open }): JSX.Element => {
        const TransitionComponent = isDrawer
          ? DrawerTransition
          : MenuTransition;
        return (
          <>
            <FilterLabel
              annotation={categoryView.annotation}
              count={isRangeView ? undefined : categoryView.values.length}
              disabled={categoryView.isDisabled}
              isOpen={open}
              label={categoryView.label}
              onClick={(e) => {
                onOpen(e);
                trackFilterOpened?.({ category: categoryView.key });
              }}
              panelId={panelId}
              surfaceType={surfaceType}
            />
            <Backdrop
              onClick={() => {
                onClose();
                closeAncestor?.();
              }}
              open={open}
              surfaceType={surfaceType}
            />
            <StyledPopper
              {...POPPER_PROPS}
              anchorEl={anchorEl}
              aria-label={categoryView.label}
              data-testid={TEST_IDS.FILTER_POPOVER}
              id={panelId}
              open={open}
              popperOptions={getPopperOptions(surfaceType)}
              // Popper defaults its root to role="tooltip", which would have
              // the label's aria-controls resolve to a tooltip. The label
              // declares aria-haspopup="dialog", and this is a non-modal
              // dialog: floating over a backdrop, without a focus trap.
              role="dialog"
              surfaceType={surfaceType}
            >
              {({ placement, TransitionProps }): JSX.Element => {
                return (
                  <TransitionComponent
                    {...TransitionProps}
                    placement={placement}
                  >
                    <Paper variant={PAPER_PROPS.VARIANT.MENU}>
                      {isDrawer && (
                        <IconButton
                          aria-label={getCloseCategoryLabel(categoryView.label)}
                          onClick={() => {
                            onClose();
                            closeAncestor?.();
                          }}
                        />
                      )}
                      {isRangeView ? (
                        <FilterRange
                          categoryKey={categoryView.key}
                          categoryLabel={categoryView.label}
                          categorySection={categorySection}
                          max={categoryView.max}
                          min={categoryView.min}
                          selectedMax={categoryView.selectedMax}
                          selectedMin={categoryView.selectedMin}
                          onCloseFilter={onClose}
                          onFilter={onFilter}
                          surfaceType={surfaceType}
                          unit={categoryView.unit}
                        />
                      ) : (
                        <FilterMenu
                          categoryKey={categoryView.key}
                          categoryLabel={categoryView.label}
                          categorySection={categorySection}
                          onCloseFilter={onClose}
                          onFilter={onFilter}
                          surfaceType={surfaceType}
                          values={categoryView.values}
                        />
                      )}
                    </Paper>
                  </TransitionComponent>
                );
              }}
            </StyledPopper>
            {tags}
          </>
        );
      }}
    </PopperProvider>
  );
};

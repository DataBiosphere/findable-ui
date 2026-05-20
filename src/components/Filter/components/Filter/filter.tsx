import { Paper } from "@mui/material";
import { JSX } from "react";
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

/**
 * Filter component.
 * TODO(cc) refactor: build tags from categoryView for selected values.
 * TODO(cc) tests: add tests for selected values (rending of tags) for select and range categories.
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
              surfaceType={surfaceType}
            />
            <Backdrop
              onClick={() => {
                onClose();
                closeAncestor?.();
              }}
              open={open}
            />
            <StyledPopper
              {...POPPER_PROPS}
              anchorEl={anchorEl}
              aria-label={categoryView.label}
              data-testid={TEST_IDS.FILTER_POPOVER}
              open={open}
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

import { Fragment, JSX } from "react";
import { DrawerProvider } from "../../../../../common/Drawer/provider/provider";
import { Controls } from "../../../controls/Controls/controls";
import { Filters } from "../../../Filters/filters";
import { SURFACE_TYPE } from "../../types";
import { Button as BaseButton } from "../components/Button/button";
import { IconButton } from "../components/IconButton/iconButton";
import { DRAWER_PROPS } from "./constants";
import { StyledDrawer } from "./drawer.styles";
import { DrawerProps } from "./types";
import { getPaperSlotProps } from "./utils";

/**
 * Filters drawer surface: the button that opens the drawer, and the drawer with a close button, the filter controls and the filters. The drawer does not show the filter sort control.
 * The drawer's paper has a default accessible name, which the caller's paper props can override, and always carries the id the button's aria-controls points at.
 * Other given Mui Drawer props override the defaults, including open and onClose.
 * @param props - Component props.
 * @param props.Button - Button that opens the drawer; defaults to the filter Button.
 * @param props.categoryFilters - Category filter groups.
 * @param props.className - Class name applied to the drawer.
 * @param props.count - Filter count, shown on the button.
 * @param props.onFilter - Function invoked when a filter changes or all filters are cleared.
 * @param props.PaperProps - Deprecated Mui paper props, merged into the paper slot props.
 * @returns The filters drawer.
 */
export const Drawer = ({
  Button = BaseButton,
  categoryFilters,
  className,
  count,
  onFilter,
  PaperProps,
  ...props /* MuiDrawerProps */
}: DrawerProps): JSX.Element | null => {
  return (
    <DrawerProvider>
      {({ id, onClose, open }) => (
        <Fragment>
          <Button count={count} />
          <StyledDrawer
            {...DRAWER_PROPS}
            className={className}
            onClose={onClose}
            open={open}
            {...props}
            slotProps={{
              ...props.slotProps,
              paper: getPaperSlotProps(id, PaperProps, props.slotProps?.paper),
            }}
          >
            {/* Closes drawer */}
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label -- this local wrapper names itself ("Close filters"); the rule only sees an empty IconButton. */}
            <IconButton />
            {/* Clear all button */}
            <Controls onFilter={onFilter} />
            <Filters
              categoryFilters={categoryFilters}
              onFilter={onFilter}
              surfaceType={SURFACE_TYPE.DRAWER}
            />
          </StyledDrawer>
        </Fragment>
      )}
    </DrawerProvider>
  );
};

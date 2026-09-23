import { mergeSlotProps } from "@mui/material/utils";
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
            // On the paper, which is the element carrying role="dialog"; the
            // drawer root is a presentational wrapper. MUI Drawer builds
            // `{ paper: PaperProps, ...slotProps }`, so a caller's deprecated
            // PaperProps are merged beneath their slotProps.paper here rather
            // than dropped. The id is applied last and overrides a caller's,
            // because it is what the trigger's aria-controls points at.
            slotProps={{
              ...props.slotProps,
              paper: mergeSlotProps(
                { id },
                mergeSlotProps(props.slotProps?.paper, PaperProps ?? {}),
              ),
            }}
          >
            {/* Closes drawer */}
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

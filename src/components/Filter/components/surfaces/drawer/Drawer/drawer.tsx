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
  ...props /* MuiDrawerProps */
}: DrawerProps): JSX.Element | null => {
  return (
    <DrawerProvider>
      {({ onClose, open }) => (
        <Fragment>
          <Button count={count} />
          <StyledDrawer
            {...DRAWER_PROPS}
            className={className}
            onClose={onClose}
            open={open}
            {...props}
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

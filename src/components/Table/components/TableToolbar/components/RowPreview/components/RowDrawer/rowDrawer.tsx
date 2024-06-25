import {
  Divider,
  DrawerProps as MDrawerProps,
  Typography as MTypography,
} from "@mui/material";
import { RowData, Table } from "@tanstack/react-table";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { TEXT_HEADING_SMALL } from "../../../../../../../../theme/common/typography";
import { DrawerContent } from "../../../../../../../common/Drawer/components/drawer.styles";
import { DEFAULT_DRAWER_PROPS } from "./common/constants";
import { Drawer, DrawerTitle } from "./rowDrawer.styles";

export interface RowDrawerProps<T extends RowData>
  extends Omit<MDrawerProps, "content" | "title"> {
  className?: string;
  tableInstance: Table<T>;
  title: ReactNode;
}

export const RowDrawer = <T extends RowData>({
  children,
  className,
  tableInstance,
  title,
  ...props /* Spread props to allow for Mui Drawer specific prop overrides. */
}: RowDrawerProps<T>): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const { getPreviewRowData, getState, resetRowPreview } = tableInstance;
  const { columnFilters, pagination, sorting } = getState();
  const rowData = getPreviewRowData();

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (rowData) {
      setOpen(true);
    }
  }, [rowData]);

  useEffect(() => {
    console.log("pag", pagination);
    setOpen(false);
  }, [columnFilters, pagination, sorting]);

  return (
    <Drawer
      {...DEFAULT_DRAWER_PROPS}
      className={className}
      onTransitionExited={(): void => {
        console.log("RESET");
        resetRowPreview();
      }}
      open={open}
      {...props}
    >
      <DrawerTitle
        onClose={onClose}
        title={
          <MTypography component="div" noWrap variant={TEXT_HEADING_SMALL}>
            {title}
          </MTypography>
        }
      />
      <Divider />
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
};

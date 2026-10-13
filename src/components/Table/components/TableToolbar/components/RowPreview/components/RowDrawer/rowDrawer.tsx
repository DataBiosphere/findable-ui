import {
  Divider,
  DrawerProps as MDrawerProps,
  Typography as MTypography,
} from "@mui/material";
import { RowData, Table } from "@tanstack/react-table";
import { JSX, ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../styles/common/mui/typography";
import { DrawerContent } from "../../../../../../../common/Drawer/components/drawer.styles";
import { DEFAULT_DRAWER_PROPS } from "./common/constants";
import { Drawer, DrawerTitle } from "./rowDrawer.styles";

/**
 * Props for the RowDrawer component.
 */
export interface RowDrawerProps<T extends RowData> extends Omit<
  MDrawerProps,
  "content" | "title"
> {
  className?: string;
  tableInstance?: Table<T>;
  title: ReactNode;
}

/**
 * Row preview drawer, anchored to the right without a backdrop, open while the table's row preview is open, with a title, a close button and the children as content.
 * Closing toggles the row preview off, and the row preview is reset once the drawer has transitioned out.
 * The given Mui Drawer props override these defaults, including open and onTransitionExited.
 * @param props - Component props.
 * @param props.children - Drawer content.
 * @param props.className - Class name applied to the drawer.
 * @param props.tableInstance - TanStack table instance; without it, the drawer is closed.
 * @param props.title - Drawer title; a string renders as a single-line heading.
 * @returns The row drawer.
 */
export const RowDrawer = <T extends RowData>({
  children,
  className,
  tableInstance,
  title,
  ...props /* Spread props to allow for Mui Drawer specific prop overrides. */
}: RowDrawerProps<T>): JSX.Element => {
  const { getIsRowPreview, resetRowPreview, toggleRowPreview } =
    tableInstance || {};
  return (
    <Drawer
      {...DEFAULT_DRAWER_PROPS}
      className={className}
      onTransitionExited={resetRowPreview}
      open={getIsRowPreview?.()}
      {...props}
    >
      <DrawerTitle
        onClose={(): void => toggleRowPreview?.()}
        title={
          typeof title === "string" ? (
            <MTypography
              component="div"
              noWrap
              variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_SMALL}
            >
              {title}
            </MTypography>
          ) : (
            title
          )
        }
      />
      <Divider />
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
};

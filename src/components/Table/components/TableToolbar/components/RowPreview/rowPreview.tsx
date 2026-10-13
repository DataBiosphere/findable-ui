import { RowData, Table } from "@tanstack/react-table";
import { JSX } from "react";
import { ComponentsConfig } from "../../../../../../config/entities";
import { ComponentCreator } from "../../../../../ComponentCreator/ComponentCreator";

/**
 * Props for the RowPreview component.
 */
export interface RowPreviewProps<T extends RowData> {
  rowPreviewView?: ComponentsConfig;
  tableInstance: Table<T>;
}

/**
 * Row preview, rendering the row preview view's components for the row selected for preview, with the table instance as view context.
 * @param props - Component props.
 * @param props.rowPreviewView - Row preview view components config.
 * @param props.tableInstance - TanStack table instance.
 * @returns The row preview, or null when there is no row preview view or no row selected for preview.
 */
export const RowPreview = <T extends RowData>({
  rowPreviewView,
  tableInstance,
}: RowPreviewProps<T>): JSX.Element | null => {
  if (!rowPreviewView) return null;
  const { getRowPreviewRow } = tableInstance;
  const { original: response } = getRowPreviewRow() || {};
  if (!response) return null;
  return (
    <ComponentCreator
      components={rowPreviewView}
      response={response}
      viewContext={{ tableInstance }}
    />
  );
};

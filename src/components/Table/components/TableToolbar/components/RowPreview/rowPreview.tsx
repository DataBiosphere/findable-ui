import { RowData, Table } from "@tanstack/react-table";
import React from "react";
import { ComponentsConfig } from "../../../../../../config/entities";
import { ComponentCreator } from "../../../../../ComponentCreator/ComponentCreator";

export interface RowPreviewProps<T extends RowData> {
  rowPreviewView?: ComponentsConfig;
  tableInstance: Table<T>;
}

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

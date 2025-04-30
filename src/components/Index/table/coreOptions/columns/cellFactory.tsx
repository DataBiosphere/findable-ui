import { CellContext, RowData } from "@tanstack/react-table";
import React from "react";
import { ComponentCreator } from "../../../../../components/ComponentCreator/ComponentCreator";
import { ColumnConfig } from "../../../../../config/entities";

/**
 * Creates a cell renderer function for a given column configuration.
 * This factory pattern allows us to create cell renderers without defining JSX in hook files.
 * @param config - The column configuration.
 * @returns A function that renders the cell content.
 */
export function createCell<T extends RowData>(config: ColumnConfig<T>) {
  return function CellCreator(context: CellContext<T, unknown>): JSX.Element {
    return (
      <ComponentCreator
        components={[config.componentConfig]}
        response={context.row.original}
        viewContext={{ cellContext: context }}
      />
    );
  };
}

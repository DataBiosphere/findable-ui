import { ColumnDef, RowData } from "@tanstack/react-table";
import React, { ReactNode } from "react";
import {
  FlatPaper,
  FluidPaper,
  GridPaper,
  RoundedPaper,
} from "../../../common/Paper/paper.styles";
import { NoResults } from "../../../NoResults/noResults";
import { StyledToolbar } from "../../../Table/components/TableToolbar/tableToolbar.styles";
import { Table, TableProps } from "../Table/table";

interface DetailViewTableProps<T extends RowData> extends TableProps<T> {
  className?: string;
  columns: ColumnDef<T>[];
  gridTemplateColumns: string;
  items: T[];
  noResultsTitle: string;
  Paper?: typeof FlatPaper | typeof FluidPaper | typeof RoundedPaper;
  tools?: ReactNode;
}

export const DetailViewTable = <T extends RowData>({
  className,
  columns,
  gridTemplateColumns,
  items,
  noResultsTitle,
  Paper = RoundedPaper,
  tools,
  ...tableProps
}: DetailViewTableProps<T>): JSX.Element => {
  return items.length > 0 ? (
    <Paper className={className}>
      <GridPaper>
        {tools && <StyledToolbar>{tools}</StyledToolbar>}
        <Table
          columns={columns}
          gridTemplateColumns={gridTemplateColumns}
          items={items}
          {...tableProps}
        />
      </GridPaper>
    </Paper>
  ) : (
    <NoResults Paper={Paper} title={noResultsTitle} />
  );
};

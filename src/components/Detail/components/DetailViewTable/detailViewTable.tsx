import { ColumnDef } from "@tanstack/react-table";
import React, { ReactNode } from "react";
import {
  FlatPaper,
  FluidPaper,
  GridPaper,
  RoundedPaper,
} from "../../../common/Paper/paper.styles";
import { NoResults } from "../../../NoResults/noResults";
import { Toolbar } from "../../../Table/components/TableToolbar/tableToolbar.styles";
import { Table } from "../Table/table";

interface DetailViewTableProps<T extends object> {
  className?: string;
  columns: ColumnDef<T>[];
  gridTemplateColumns: string;
  items: T[];
  noResultsTitle: string;
  Paper?: typeof FlatPaper | typeof FluidPaper | typeof RoundedPaper;
  tools?: ReactNode;
}

export const DetailViewTable = <T extends object>({
  className,
  columns,
  gridTemplateColumns,
  items,
  noResultsTitle,
  Paper = RoundedPaper,
  tools,
}: DetailViewTableProps<T>): JSX.Element => {
  return items.length > 0 ? (
    <Paper className={className}>
      <GridPaper>
        {tools && <Toolbar variant="table">{tools}</Toolbar>}
        <Table
          columns={columns}
          gridTemplateColumns={gridTemplateColumns}
          items={items}
        />
      </GridPaper>
    </Paper>
  ) : (
    <NoResults Paper={Paper} title={noResultsTitle} />
  );
};

import { ColumnDef } from "@tanstack/react-table";
import React, { ReactNode } from "react";
import { GridPaper, RoundedPaper } from "../../../common/Paper/paper.styles";
import { NoResults } from "../../../NoResults/noResults";
import { TableToolbar } from "../../../Table/table.styles";
import { Table } from "../Table/table";

interface DetailViewTableProps<T extends object> {
  columns: ColumnDef<T>[];
  gridTemplateColumns: string;
  items: T[];
  noResultsTitle: string;
  tools?: ReactNode;
}

export const DetailViewTable = <T extends object>({
  columns,
  gridTemplateColumns,
  items,
  noResultsTitle,
  tools,
}: DetailViewTableProps<T>): JSX.Element => {
  return items.length > 0 ? (
    <RoundedPaper>
      <GridPaper>
        {tools && <TableToolbar>{tools}</TableToolbar>}
        <Table
          columns={columns}
          gridTemplateColumns={gridTemplateColumns}
          items={items}
        />
      </GridPaper>
    </RoundedPaper>
  ) : (
    <NoResults title={noResultsTitle} />
  );
};

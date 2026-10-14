import { ColumnDef, RowData } from "@tanstack/react-table";
import { JSX, ReactNode } from "react";
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

/**
 * Table for a detail page, in a paper with optional tools above it.
 * @param props - Component props; other props are passed to the table.
 * @param props.className - Class name applied to the paper; not applied to the no results message.
 * @param props.columns - Column definitions.
 * @param props.gridTemplateColumns - Grid template columns for the table.
 * @param props.items - Rows of data.
 * @param props.noResultsTitle - Title shown when there are no items.
 * @param props.Paper - Paper to render in. Defaults to RoundedPaper.
 * @param props.tools - Content shown in a toolbar above the table.
 * @returns The table, or a no results message when there are no items.
 */
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

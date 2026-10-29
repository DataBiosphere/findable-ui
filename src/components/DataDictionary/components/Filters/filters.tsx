import { RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { Attribute } from "../../../../common/entities";
import { GlobalFilter } from "../../../Table/components/TableFeatures/GlobalFilter/globalFilter";
import { ColumnFilters } from "./components/ColumnFilters/columnFilters";
import { Download } from "./components/Download/download";
import { FILTERS_CLASS_NAME } from "./constants";
import { StyledGrid } from "./filters.styles";
import { FiltersProps } from "./types";

/**
 * Data dictionary filters: a global search over all attributes, followed by the column filters and, when configured, the download link.
 * The grid carries `FILTERS_CLASS_NAME`, so the filters layout can target it.
 * @param props - Component props.
 * @param props.download - Download link; without it, no download is shown.
 * @param props.table - TanStack table instance.
 * @returns The filters.
 */
export const Filters = <T extends RowData = Attribute>({
  download,
  table,
}: FiltersProps<T>): JSX.Element => {
  return (
    <StyledGrid className={FILTERS_CLASS_NAME}>
      <GlobalFilter placeholder="Search all attributes..." table={table} />
      <ColumnFilters table={table} />
      <Download download={download} />
    </StyledGrid>
  );
};

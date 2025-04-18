import { ColumnFiltersState, getFilteredRowModel } from "@tanstack/react-table";
import { ComponentProps } from "react";
import { COLUMN_IDENTIFIER } from "../../../../../Table/common/columnIdentifier";
import { Table } from "../../table";
import { DEFAULT_DATA, DEFAULT_TABLE_ARGS } from "../args";

export const COLUMN_FILTERS_STATE: Record<string, ColumnFiltersState> = {
  ARRAY: [
    {
      id: "dataType",
      value: [DEFAULT_DATA.DATA_TYPES.EXOME, DEFAULT_DATA.DATA_TYPES.RNASEQ],
    },
  ],
  RANGE_BETWEEN: [
    {
      id: "participantCount",
      value: [10, 100],
    },
  ],
  RANGE_GREATER_THAN: [
    {
      id: "participantCount",
      value: [100, null],
    },
  ],
  RANGE_LESS_THAN: [
    {
      id: "participantCount",
      value: [null, 100],
    },
  ],
  STRING: [
    {
      id: "studyName",
      value: [
        DEFAULT_DATA.STUDY_NAME.CORONARY_ARTERY_DISEASE_STUDY,
        DEFAULT_DATA.STUDY_NAME.MYOCARDIAL_INFARCTION_STUDY,
      ],
    },
  ],
  STRING_NO_MATCH: [{ id: "studyName", value: ["Invalid"] }],
};

export const FILTER_TABLE_ARGS: ComponentProps<typeof Table> = {
  ...DEFAULT_TABLE_ARGS,
  tableOptions: {
    enableFilters: true,
    enableRowPosition: false,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      columnVisibility: { [COLUMN_IDENTIFIER.ROW_POSITION]: false },
    },
  },
};

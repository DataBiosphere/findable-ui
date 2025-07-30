import { Box } from "@mui/material";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { functionalUpdate, Table } from "@tanstack/react-table";
import React from "react";
import { Filters } from "../filters";
import { COLUMNS } from "./constants";
import { useFilterStore, useGlobalFilterStore } from "./hook";
import { PartialColumn } from "./types";
import { buildColumnFilters } from "./utils";

const meta: Meta<typeof Filters> = {
  component: Filters,
  decorators: [
    (Story): JSX.Element => (
      <Box sx={{ width: 600 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultStory = (): JSX.Element => {
  const { filterStore, setFilterStore } = useFilterStore();
  const { globalFilter, setGlobalFilter } = useGlobalFilterStore();

  // Builds column filters from filter store.
  const columnFilters = buildColumnFilters(filterStore);

  const makeColumn = (column: PartialColumn): PartialColumn => ({
    ...column,
    getFilterValue: () => filterStore[column.id],
    getIsFiltered: () => !!filterStore[column.id],
    setFilterValue: (updaterOrValue: unknown): unknown => {
      const next = functionalUpdate(updaterOrValue, filterStore[column.id]);
      setFilterStore({ ...filterStore, [column.id]: next });
      action("setFilterValue")(next);
      return next;
    },
  });

  // Make the columns.
  const columns = COLUMNS.map(makeColumn);

  const table = {
    getAllColumns: () => columns,
    getColumn: (columnId: string) => columns.find(({ id }) => id === columnId)!,
    getState: () => ({ columnFilters, globalFilter }),
    options: { enableColumnFilters: true, enableGlobalFilter: true },
    setGlobalFilter,
  } as Table<unknown>;

  return <Filters table={table} />;
};

export const Default: Story = {
  render: () => <DefaultStory />,
};

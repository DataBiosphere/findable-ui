import { Box } from "@mui/material";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { functionalUpdate, Table } from "@tanstack/react-table";
import React from "react";
import { Filters } from "../filters";
import { BIONETWORK, DESCRIPTION, EXAMPLE, REQUIRED } from "./constants";
import { useFilterStore, useGlobalFilterStore } from "./hook";
import { PartialColumn } from "./types";

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

  const table = {
    getAllColumns: () =>
      [DESCRIPTION, REQUIRED, BIONETWORK, EXAMPLE].map(makeColumn),
    getState: () => ({ globalFilter }),
    options: { enableColumnFilters: true, enableGlobalFilter: true },
    setGlobalFilter,
  } as Table<unknown>;

  return <Filters table={table} />;
};

export const Default: Story = {
  render: () => <DefaultStory />,
};

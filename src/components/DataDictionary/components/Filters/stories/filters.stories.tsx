import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { functionalUpdate, Table } from "@tanstack/react-table";
import React from "react";
import { Filters } from "../filters";
import { BIONETWORK, EXAMPLE, REQUIRED } from "./constants";
import { useFilterStore } from "./hook";
import { PartialColumn } from "./types";

const meta: Meta<typeof Filters> = {
  component: Filters,
};

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultStory = (): JSX.Element => {
  const { filterStore, setFilterStore } = useFilterStore();

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
    getAllColumns: () => [REQUIRED, BIONETWORK, EXAMPLE].map(makeColumn),
  } as Table<unknown>;

  return <Filters table={table} />;
};

export const Default: Story = {
  render: () => <DefaultStory />,
};

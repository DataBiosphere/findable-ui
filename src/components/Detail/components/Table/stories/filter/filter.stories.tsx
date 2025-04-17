import { Meta, StoryObj } from "@storybook/react";
import { Table } from "../../table";
import tableMeta from "../table.stories";
import { COLUMN_FILTERS_STATE, FILTER_TABLE_ARGS } from "./args";

const meta: Meta<typeof Table> = {
  ...tableMeta,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const FilterByStringValue: Story = {
  args: {
    ...FILTER_TABLE_ARGS,
    tableOptions: {
      ...FILTER_TABLE_ARGS.tableOptions,
      initialState: {
        ...FILTER_TABLE_ARGS.tableOptions?.initialState,
        columnFilters: COLUMN_FILTERS_STATE.STRING,
      },
    },
  },
};

export const FilterByArrayValue: Story = {
  args: {
    ...FILTER_TABLE_ARGS,
    tableOptions: {
      ...FILTER_TABLE_ARGS.tableOptions,
      initialState: {
        ...FILTER_TABLE_ARGS.tableOptions?.initialState,
        columnFilters: COLUMN_FILTERS_STATE.ARRAY,
      },
    },
  },
};

export const FilterByRangeBetweenValue: Story = {
  args: {
    ...FILTER_TABLE_ARGS,
    tableOptions: {
      ...FILTER_TABLE_ARGS.tableOptions,
      initialState: {
        ...FILTER_TABLE_ARGS.tableOptions?.initialState,
        columnFilters: COLUMN_FILTERS_STATE.RANGE_BETWEEN,
      },
    },
  },
};

export const FilterByRangeGreaterThanValue: Story = {
  args: {
    ...FILTER_TABLE_ARGS,
    tableOptions: {
      ...FILTER_TABLE_ARGS.tableOptions,
      initialState: {
        ...FILTER_TABLE_ARGS.tableOptions?.initialState,
        columnFilters: COLUMN_FILTERS_STATE.RANGE_GREATER_THAN,
      },
    },
  },
};

export const FilterByRangeLessThanValue: Story = {
  args: {
    ...FILTER_TABLE_ARGS,
    tableOptions: {
      ...FILTER_TABLE_ARGS.tableOptions,
      initialState: {
        ...FILTER_TABLE_ARGS.tableOptions?.initialState,
        columnFilters: COLUMN_FILTERS_STATE.RANGE_LESS_THAN,
      },
    },
  },
};

export const FilterByStringValueWithNoMatch: Story = {
  args: {
    ...FILTER_TABLE_ARGS,
    tableOptions: {
      ...FILTER_TABLE_ARGS.tableOptions,
      initialState: {
        ...FILTER_TABLE_ARGS.tableOptions?.initialState,
        columnFilters: COLUMN_FILTERS_STATE.STRING_NO_MATCH,
      },
    },
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import {
  FILTER_SORT,
  type FilterSortConfig,
} from "../../../../../../../common/filters/sort/config/types";
import { ColumnFiltersAdapter } from "../columnFiltersAdapter";
import { useStoryTable } from "./hook";
import { Surface } from "./surface";
import type { StoryAdapterProps } from "./types";
import { pinLastCompare } from "./utils";

const meta: Meta<typeof ColumnFiltersAdapter> = {
  component: ColumnFiltersAdapter,
};

export default meta;

type Story = StoryObj<typeof meta>;

const StoryAdapter = ({
  filterSort,
}: StoryAdapterProps): JSX.Element | null => {
  const table = useStoryTable(filterSort);
  return (
    <ColumnFiltersAdapter
      renderSurface={(props) => <Surface {...props} />}
      table={table}
    />
  );
};

const FILTER_SORT_WITH_COMPARATOR: FilterSortConfig = {
  compare: pinLastCompare,
  sortBy: FILTER_SORT.ALPHA,
};

export const Default: Story = {
  render: () => <StoryAdapter filterSort={FILTER_SORT.ALPHA} />,
};

export const WithComparator: Story = {
  render: () => <StoryAdapter filterSort={FILTER_SORT_WITH_COMPARATOR} />,
};

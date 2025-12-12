import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FILTER_SORT } from "../../../../../../../../common/filters/sort/config/types";
import { FilterSort } from "../filterSort";

const meta: Meta<typeof FilterSort> = {
  component: FilterSort,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {
  args: { enabled: true, filterSort: FILTER_SORT.ALPHA },
};

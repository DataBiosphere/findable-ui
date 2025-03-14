import { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./pagination";

const meta = {
  argTypes: {
    canNextPage: { control: "boolean" },
    canPreviousPage: { control: "boolean" },
    currentPage: { control: "number" },
    onNextPage: { action: "nextPage" },
    onPreviousPage: { action: "previousPage" },
    totalPage: { control: "number" },
  },
  component: Pagination,
  title: "Components/Table",
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PaginationStory: Story = {
  args: {
    canNextPage: true,
    canPreviousPage: false,
    currentPage: 1,
    onNextPage: () => {},
    onPreviousPage: () => {},
    totalPage: 25,
  },
};

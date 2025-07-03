import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { VIEW_MODE } from "../../../../../EntityView/hooks/UseEntityView/types";
import { ViewToggle } from "../viewToggle";

const meta: Meta<typeof ViewToggle> = {
  args: {
    onChange: fn(),
    viewMode: VIEW_MODE.TABLE,
    viewStatus: { disabled: false },
  },
  component: ViewToggle,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ChartView: Story = {
  args: {
    viewMode: VIEW_MODE.CHART,
    viewStatus: { disabled: false },
  },
};

export const TableView: Story = {
  args: {
    viewMode: VIEW_MODE.TABLE,
    viewStatus: { disabled: false },
  },
};

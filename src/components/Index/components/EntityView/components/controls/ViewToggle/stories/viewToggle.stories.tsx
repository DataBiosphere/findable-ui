import { Meta, StoryObj } from "@storybook/react";
import { ViewToggle } from "../viewToggle";

const meta: Meta<typeof ViewToggle> = {
  component: ViewToggle,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

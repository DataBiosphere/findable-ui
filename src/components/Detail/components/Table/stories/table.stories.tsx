import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { CONTROL_TYPE } from "../../../../../storybook/controls/types";
import { configureControls } from "../../../../../storybook/controls/utils";
import { Table } from "../table";
import { DEFAULT_TABLE_ARGS } from "./args";
import { BOOLEAN_CONTROLS, DISABLED_CONTROLS } from "./contants";

const meta: Meta<typeof Table> = {
  argTypes: {
    ...configureControls<ComponentProps<typeof Table>>(
      DISABLED_CONTROLS,
      CONTROL_TYPE.DISABLED
    ),
    ...configureControls<ComponentProps<typeof Table>>(
      BOOLEAN_CONTROLS,
      CONTROL_TYPE.BOOLEAN
    ),
  },
  component: Table,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: DEFAULT_TABLE_ARGS,
};

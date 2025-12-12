import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ComponentProps } from "react";
import { CONTROL_TYPE } from "../../../../../../../../../../../storybook/controls/types";
import { configureControls } from "../../../../../../../../../../../storybook/controls/utils";
import { LOREM_IPSUM } from "../../../../../../../../../../../storybook/loremIpsum";
import { Icon } from "../icon";
import { DISABLED_CONTROLS } from "./contants";

const meta: Meta<typeof Icon> = {
  argTypes: configureControls<ComponentProps<typeof Icon>>(
    DISABLED_CONTROLS,
    CONTROL_TYPE.DISABLED
  ),
  component: Icon,
  title: "Components/Stepper/StepLabel/Icon",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slotProps: {
      tooltip: {
        title: LOREM_IPSUM.SHORT,
      },
    },
  },
};

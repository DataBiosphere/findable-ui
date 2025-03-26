import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { getDisabledControls } from "../../../../../../../../../../../storybook/controls/utils";
import { LOREM_IPSUM } from "../../../../../../../../../../../storybook/loremIpsum";
import { Icon } from "../icon";
import { DISABLED_CONTROLS } from "./contants";

const meta: Meta<typeof Icon> = {
  argTypes: getDisabledControls<ComponentProps<typeof Icon>>(DISABLED_CONTROLS),
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

import { Meta, StoryObj } from "@storybook/react";
import { BackPageHero } from "../backPageHero";
import { DEFAULT_ARGS } from "./constants";

const meta: Meta<typeof BackPageHero> = {
  component: BackPageHero,
  title: "Components/EntityView/BackPageHero",
};

export default meta;

type Story = StoryObj<typeof BackPageHero>;

export const Default: Story = {
  args: DEFAULT_ARGS,
};

import { Meta, StoryObj } from "@storybook/react";
import { BackPageHero } from "./backPageHero";

export default {
  component: BackPageHero,
  title: "Components/Hero",
} as Meta<typeof BackPageHero>;

type Story = StoryObj<typeof BackPageHero>;

export const BackPageHeroStory: Story = {
  args: {
    title:
      "A Single-Cell Transcriptomic Map of the Human and Mouse Pancreas Reveals Inter- and Intra-cell Population Structure",
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BackPageHero } from "../backPageHero";

const meta: Meta<typeof BackPageHero> = {
  component: BackPageHero,
  title: "Components/EntityView/BackPageHero",
};

export default meta;

type Story = StoryObj<typeof BackPageHero>;

export const Default: Story = {
  args: {
    breadcrumbs: [
      { path: "/", text: "Explore" },
      {
        path: "",
        text: "Spatial multi-omic map of human myocardial infarction",
      },
    ],
    title: "Spatial multi-omic map of human myocardial infarction",
  },
};

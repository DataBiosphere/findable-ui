import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionTitle } from "./sectionTitle";

const meta = {
  argTypes: {
    title: { control: "text" },
  },
  component: SectionTitle,
  title: "Components/SectionContent/Title",
} satisfies Meta<typeof SectionTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SectionTitleStory: Story = {
  args: {
    title: "Analysis Portals",
  },
};

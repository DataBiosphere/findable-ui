import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Citation } from "./citation";

const meta: Meta<typeof Citation> = {
  argTypes: {
    projectPath: { control: "text" },
    url: { control: "text" },
  },
  component: Citation,
  title: "Components/SectionContent/Content/Project",
};

export default meta;
type Story = StoryObj<typeof Citation>;

export const CitationStory: Story = {
  args: {
    projectPath: "60ea42e1-af49-42f5-8164-d641fdb696bc",
    url: "https://data.humancellatlas.org/explore/projects/",
  },
};

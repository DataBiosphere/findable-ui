import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CollaboratingOrganizations } from "./collaboratingOrganizations";

const meta = {
  argTypes: {
    collaboratingOrganizations: { control: "object" },
  },
  component: CollaboratingOrganizations,
  title: "Components/SectionContent/Content/Project",
} satisfies Meta<typeof CollaboratingOrganizations>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CollaboratingOrganizationsStory: Story = {
  args: {
    collaboratingOrganizations: [
      {
        citation: 1,
        name: "The Jackson Laboratory",
      },
      {
        citation: 2,
        name: "The New York Genome Center",
      },
      {
        citation: 3,
        name: "Weill Cornell Medicine",
      },
    ],
  },
};

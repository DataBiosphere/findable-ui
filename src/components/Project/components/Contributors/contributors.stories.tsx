import { Meta, StoryObj } from "@storybook/react";
import { Contributors } from "./contributors";

const meta = {
  component: Contributors,
  title: "Components/SectionContent/Content/Project",
} satisfies Meta<typeof Contributors>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ContributorsStory: Story = {
  args: {
    contributors: [
      {
        citation: 1,
        name: "Rose R Reginold",
        role: undefined,
      },
      {
        citation: 1,
        name: "Frank D Dirk",
        role: "Project Coordinator",
      },
      {
        citation: 2,
        name: "Marcelo Freire",
        role: "Principal Investigator",
      },
      {
        citation: 3,
        name: "Nathan Lawlor",
        role: "Computational Scientist",
      },
    ],
  },
};

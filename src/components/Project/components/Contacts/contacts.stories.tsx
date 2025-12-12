import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Contacts } from "./contacts";

const meta = {
  argTypes: {
    contacts: { control: "object" },
  },
  component: Contacts,
  title: "Components/SectionContent/Content/Project",
} satisfies Meta<typeof Contacts>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ContactsStory: Story = {
  args: {
    contacts: [
      {
        email: "gervaise.henry@utsouthwestern.edu",
        institution: "UT Southwestern",
        name: "Gervaise H Henry",
      },
      {
        email: "poppy@utsouthwestern.edu",
        institution: "UT Southwestern",
        name: "Poppy Rose Roberts",
      },
    ],
  },
};

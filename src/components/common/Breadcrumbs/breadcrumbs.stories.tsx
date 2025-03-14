import { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./breadcrumbs";

const meta = {
  component: Breadcrumbs,
  title: "Components/Common/BreadCrumbs",
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BreadcrumbDefaultStory: Story = {
  args: {
    breadcrumbs: [
      {
        path: "#",
        text: "Home",
      },
      {
        path: "#",
        text: "Data Explorer",
      },
    ],
  },
};

export const BreadcrumbCustomSeparatorStory: Story = {
  args: {
    Separator: " | ",
    breadcrumbs: [
      {
        path: "#",
        text: "Home",
      },
      {
        path: "#",
        text: "Data Explorer",
      },
    ],
  },
};

export const BreadcrumbWithLongerTitleStory: Story = {
  args: {
    breadcrumbs: [
      {
        path: "#",
        text: "Explore",
      },
      {
        path: "#",
        text: "A Single-Cell Transcriptomic Map of the Human and Mouse Pancreas Reveals Inter- and Intra-cell Population Structure",
      },
    ],
  },
};

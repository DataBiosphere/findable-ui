import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CustomIcon } from "../../../../../common/CustomIcon/customIcon";
import { NavLinkMenu } from "./navLinkMenu";

const meta = {
  argTypes: {
    menuItems: { control: "array" },
    menuLabel: { control: "text" },
  },
  component: NavLinkMenu,
  title: "Components/Navigation/NavLinkMenu",
} satisfies Meta<typeof NavLinkMenu>;

export default meta;
type Story = StoryObj<typeof NavLinkMenu>;

export const NavLinkMenuStory: Story = {
  args: {
    menuItems: [
      {
        label: "News",
        url: "/news",
      },
      {
        label: "Events",
        url: "/events",
      },
      {
        label: "Team",
        url: "/team",
      },
      {
        label: "FAQ",
        url: "/faq",
      },
    ],
    menuLabel: "More",
  },
};

export const FollowUsMenuStory: Story = {
  args: {
    menuItems: [
      {
        icon: (
          <CustomIcon fontSize="small" color="inkLight" iconName="discourse" />
        ),
        label: "Discourse",
        url: "https://www.discourse.org/",
      },
      {
        icon: (
          <CustomIcon fontSize="small" color="inkLight" iconName="twitter" />
        ),
        label: "Twitter",
        url: "https://twitter.com",
      },
      {
        icon: <CustomIcon fontSize="small" color="inkLight" iconName="slack" />,
        label: "Slack",
        url: "https://join.slack.com",
      },
      {
        icon: (
          <CustomIcon fontSize="small" color="inkLight" iconName="youtube" />
        ),
        label: "YouTube",
        url: "https://www.youtube.com",
      },
      {
        icon: (
          <CustomIcon fontSize="small" color="inkLight" iconName="github" />
        ),
        label: "GitHub",
        url: "https://github.com",
      },
    ],
    menuLabel: "Follow Us",
  },
};

export const MenuWithDescriptionsStory: Story = {
  args: {
    menuItems: [
      {
        description:
          "An open-access view of studies, workspaces, and consortia.",
        label: "Catalog",
        url: "#",
      },
      {
        description:
          "Build, download, and export cross-study cohorts of open and managed access data.",
        label: "Explorer",
        url: "#",
      },
    ],
    menuLabel: "Datasets",
  },
};

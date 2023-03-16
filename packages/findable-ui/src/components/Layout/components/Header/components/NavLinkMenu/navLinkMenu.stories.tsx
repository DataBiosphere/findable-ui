import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { CustomIcon } from "../../../../../common/CustomIcon/customIcon";
import { NavLinkMenu } from "./navLinkMenu";

export default {
  argTypes: {
    menuItems: { control: "array" },
    menuLabel: { control: "text" },
  },
  component: NavLinkMenu,
  title: "Components/Navigation/NavLinkMenu",
} as ComponentMeta<typeof NavLinkMenu>;

const NavLinkMenuTemplate: ComponentStory<typeof NavLinkMenu> = (args) => (
  <NavLinkMenu {...args} />
);

export const NavLinkMenuStory = NavLinkMenuTemplate.bind({});
NavLinkMenuStory.args = {
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
};

export const FollowUsMenuStory = NavLinkMenuTemplate.bind({});
FollowUsMenuStory.args = {
  menuItems: [
    {
      icon: (
        <CustomIcon fontSize="small" color="inkLight" iconName="discourse" />
      ),
      label: "Discourse",
      url: "https://www.discourse.org/",
    },
    {
      icon: <CustomIcon fontSize="small" color="inkLight" iconName="twitter" />,
      label: "Twitter",
      url: "https://twitter.com",
    },
    {
      icon: <CustomIcon fontSize="small" color="inkLight" iconName="slack" />,
      label: "Slack",
      url: "https://join.slack.com",
    },
    {
      icon: <CustomIcon fontSize="small" color="inkLight" iconName="youtube" />,
      label: "YouTube",
      url: "https://www.youtube.com",
    },
    {
      icon: <CustomIcon fontSize="small" color="inkLight" iconName="github" />,
      label: "GitHub",
      url: "https://github.com",
    },
  ],
  menuLabel: "Follow Us",
};

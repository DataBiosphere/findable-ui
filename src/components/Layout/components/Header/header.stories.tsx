import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ELEMENT_ALIGNMENT } from "../../../../common/entities";
import logo from "../../../../images/logo.svg";
import { DiscourseIcon } from "../../../common/CustomIcon/components/DiscourseIcon/discourseIcon";
import { GitHubIcon } from "../../../common/CustomIcon/components/GitHubIcon/gitHubIcon";
import { XIcon } from "../../../common/CustomIcon/components/XIcon/xIcon";
import { YouTubeIcon } from "../../../common/CustomIcon/components/YouTubeIcon/youTubeIcon";
import { HEADER_NAVIGATION_LABEL } from "./common/constants";
import { Logo } from "./components/Content/components/Logo/logo";
import { Header } from "./header";

export default {
  argTypes: {
    Logo: { control: { disable: true } },
    authenticationEnabled: { control: "boolean" },
    navAlignment: {
      control: "select",
      options: [ELEMENT_ALIGNMENT.LEFT, ELEMENT_ALIGNMENT.CENTER],
    },
    navLinks: { control: "array" },
    searchEnabled: { control: "boolean" },
    slogan: { control: "text" },
    socialMedia: { control: { disable: true } },
  },
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Layout/Header",
} as Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

const url = "/";

export const HeaderStory: Story = {
  args: {
    Logo: <Logo alt="Logo" height={40} link="/" src={logo} />,
    authenticationEnabled: false,
    navAlignment: ELEMENT_ALIGNMENT.CENTER,
    navLinks: [
      {
        label: "Overview",
        url,
      },
      {
        label: "Learn",
        url,
      },
      {
        label: "Datasets",
        url,
      },
      {
        label: "More",
        menuItems: [
          {
            label: "Team",
            url,
          },
          {
            label: "FAQ",
            url,
          },
          {
            label: "Help",
            url,
          },
        ],
        url: "",
      },
    ],
    searchEnabled: true,
    slogan: "Header Slogan",
    socialMedia: {
      label: HEADER_NAVIGATION_LABEL.SOCIALS,
      socials: [
        {
          Icon: XIcon,
          label: "X",
          url: "https://twitter.com",
        },
        {
          Icon: YouTubeIcon,
          label: "YouTube",
          url: "https://www.youtube.com",
        },
        {
          Icon: DiscourseIcon,
          label: "Discourse",
          url: "https://www.discourse.org/",
        },
        {
          Icon: GitHubIcon,
          label: "GitHub",
          url: "https://github.com",
        },
      ],
    },
  },
};

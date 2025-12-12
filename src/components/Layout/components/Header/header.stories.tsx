import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import logo from "../../../../images/logo.svg";
import { DiscourseIcon } from "../../../common/CustomIcon/components/DiscourseIcon/discourseIcon";
import { GitHubIcon } from "../../../common/CustomIcon/components/GitHubIcon/gitHubIcon";
import { XIcon } from "../../../common/CustomIcon/components/XIcon/xIcon";
import { YouTubeIcon } from "../../../common/CustomIcon/components/YouTubeIcon/youTubeIcon";
import { Logo } from "./components/Content/components/Logo/logo";
import { Header } from "./header";

export default {
  argTypes: {
    authenticationEnabled: { control: "boolean" },
    logo: { control: { disable: true } },
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
    authenticationEnabled: false,
    logo: <Logo alt="Logo" height={40} link="/" src={logo.src} />,
    navigation: [
      undefined,
      [
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
      undefined,
    ],
    searchEnabled: true,
    slogan: "Header Slogan",
    socialMedia: {
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

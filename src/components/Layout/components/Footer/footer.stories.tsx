import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import logo from "../../../../images/logo.svg";
import { DiscourseIcon } from "../../../common/CustomIcon/components/DiscourseIcon/discourseIcon";
import { FacebookIcon } from "../../../common/CustomIcon/components/FacebookIcon/facebookIcon";
import { GitHubIcon } from "../../../common/CustomIcon/components/GitHubIcon/gitHubIcon";
import { XIcon } from "../../../common/CustomIcon/components/XIcon/xIcon";
import { YouTubeIcon } from "../../../common/CustomIcon/components/YouTubeIcon/youTubeIcon";
import { Logo } from "../Header/components/Content/components/Logo/logo";
import { Footer } from "./footer";

export default {
  argTypes: {
    Branding: { control: { disabled: true } },
    navLinks: { control: "array" },
    socials: { control: { disabled: true } },
  },
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Layout/Footer",
} as Meta<typeof Footer>;

type Story = StoryObj<typeof Footer>;

export const FooterStory: Story = {
  args: {
    Branding: <Logo alt="logo" height={24} link={"/"} src={logo} />,
    navLinks: [
      {
        label: "Help",
        url: "https://support.google.com/",
      },
      {
        label: "Privacy",
        url: "https://policies.google.com/privacy?hl=en-US",
      },
    ],
    socials: [
      {
        Icon: DiscourseIcon,
        label: null,
        url: "https://www.discourse.org/",
      },
      {
        Icon: XIcon,
        label: null,
        url: "https://twitter.com",
      },
      {
        Icon: FacebookIcon,
        label: null,
        url: "https://facebook.com",
      },
      {
        Icon: YouTubeIcon,
        label: null,
        url: "https://www.youtube.com",
      },
      {
        Icon: GitHubIcon,
        label: null,
        url: "https://github.com",
      },
    ],
  },
};

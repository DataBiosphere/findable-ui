import { Meta, StoryObj } from "@storybook/react";
import { DiscourseIcon } from "../CustomIcon/components/DiscourseIcon/discourseIcon";
import { FacebookIcon } from "../CustomIcon/components/FacebookIcon/facebookIcon";
import { GitHubIcon } from "../CustomIcon/components/GitHubIcon/gitHubIcon";
import { LinkedInIcon } from "../CustomIcon/components/LinkedInIcon/linkedInIcon";
import { SlackIcon } from "../CustomIcon/components/SlackIcon/slackIcon";
import { XIcon } from "../CustomIcon/components/XIcon/xIcon";
import { YouTubeIcon } from "../CustomIcon/components/YouTubeIcon/youTubeIcon";
import { Socials } from "./socials";

const meta = {
  argTypes: {
    socials: { control: "object" },
  },
  component: Socials,
  title: "Components/Navigation/SocialLinks",
} satisfies Meta<typeof Socials>;

export default meta;

type Story = StoryObj<typeof Socials>;

export const SocialsStory: Story = {
  args: {
    socials: [
      {
        Icon: XIcon,
        label: null,
        url: "https://twitter.com",
      },
      {
        Icon: GitHubIcon,
        label: null,
        url: "https://github.com",
      },
      {
        Icon: YouTubeIcon,
        label: null,
        url: "https://www.youtube.com",
      },
      {
        Icon: DiscourseIcon,
        label: null,
        url: "https://www.discourse.org",
      },
      {
        Icon: SlackIcon,
        label: null,
        url: "https://slack.com",
      },
      {
        Icon: FacebookIcon,
        label: null,
        url: "https://www.facebook.com",
      },
      {
        Icon: LinkedInIcon,
        label: null,
        url: "https://www.linkedin.com",
      },
    ],
  },
};

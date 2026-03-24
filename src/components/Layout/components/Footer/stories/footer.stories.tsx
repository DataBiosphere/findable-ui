import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DiscourseIcon } from "../../../../common/CustomIcon/components/DiscourseIcon/discourseIcon";
import { FacebookIcon } from "../../../../common/CustomIcon/components/FacebookIcon/facebookIcon";
import { GitHubIcon } from "../../../../common/CustomIcon/components/GitHubIcon/gitHubIcon";
import { XIcon } from "../../../../common/CustomIcon/components/XIcon/xIcon";
import { YouTubeIcon } from "../../../../common/CustomIcon/components/YouTubeIcon/youTubeIcon";
import { Logo } from "../../Header/components/Content/components/Logo/logo";
import { Footer } from "../footer";

const meta: Meta<typeof Footer> = {
  component: Footer,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    Branding: (
      <Logo alt="logo" height={24} link={"/"} src="src/images/logo.svg" />
    ),
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
    poweredByCC: { src: "src/images/cc.svg" },
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

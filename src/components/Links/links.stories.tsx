import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Links } from "./links";

const FACEBOOK_URL = "https://www.facebook.com";
const GOOGLE_URL = "https://www.google.com";
const TWITTER_URL = "https://www.twitter.com";

const meta = {
  argTypes: {
    links: { control: "object" },
  },
  component: Links,
  title: "Components/Deprecated/Links",
} satisfies Meta<typeof Links>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LinksStory: Story = {
  args: {
    links: [
      { label: "Facebook", url: FACEBOOK_URL },
      { label: "Google", url: GOOGLE_URL },
      { label: "Twitter", url: TWITTER_URL },
    ],
  },
};

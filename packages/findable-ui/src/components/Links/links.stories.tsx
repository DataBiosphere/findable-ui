import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Links } from "./links";

export default {
  argTypes: {
    links: { control: "array" },
  },
  component: Links,
  title: "Components/Deprecated/Links",
} as ComponentMeta<typeof Links>;

const LinksTemplate: ComponentStory<typeof Links> = (args) => (
  <Links {...args} />
);

const FACEBOOK_URL = "https://www.facebook.com";
const GOOGLE_URL = "https://www.google.com";
const TWITTER_URL = "https://www.twitter.com";

export const LinksStory = LinksTemplate.bind({});
LinksStory.args = {
  links: [
    { label: "Facebook", url: FACEBOOK_URL },
    { label: "Google", url: GOOGLE_URL },
    { label: "Twitter", url: TWITTER_URL },
  ],
};

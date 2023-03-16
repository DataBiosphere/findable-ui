import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { SOCIAL, Socials } from "./socials";

export default {
  argTypes: {
    socials: { control: "object" },
  },
  component: Socials,
  title: "Components/Navigation/SocialLinks",
} as ComponentMeta<typeof Socials>;

const GITHUB_URL = "https://github.com";

const SocialsTemplate: ComponentStory<typeof Socials> = (args) => (
  <Socials {...args} />
);

export const SocialsStory = SocialsTemplate.bind({});
SocialsStory.args = {
  socials: [
    {
      ...SOCIAL.TWITTER,
      url: GITHUB_URL,
    },
    {
      ...SOCIAL.GITHUB,
      url: GITHUB_URL,
    },
    {
      ...SOCIAL.YOUTUBE,
      url: GITHUB_URL,
    },
    {
      ...SOCIAL.DISCOURSE,
      url: GITHUB_URL,
    },
    {
      ...SOCIAL.SLACK,
      url: GITHUB_URL,
    },
  ],
};

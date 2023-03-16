import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ELEMENT_ALIGNMENT } from "../../../../common/entities";
import logo from "../../../../images/logo.svg";
import { SOCIAL } from "../../../common/Socials/socials";
import { Header } from "./header";

export default {
  argTypes: {
    header: {
      authenticationEnabled: { control: "boolean" },
      logo: { control: "object" },
      navAlignment: {
        control: "select",
        options: [ELEMENT_ALIGNMENT.LEFT, ELEMENT_ALIGNMENT.CENTER],
      },
      navLinks: { control: "array" },
      searchEnabled: { control: "boolean" },
      slogan: { control: "text" },
      socials: { control: "array" },
    },
  },
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Layout/Header",
} as ComponentMeta<typeof Header>;

const HeaderTemplate: ComponentStory<typeof Header> = (args) => (
  <Header {...args} />
);

const url = "https://www.google.com/";

export const HeaderStory = HeaderTemplate.bind({});
HeaderStory.args = {
  authenticationEnabled: false,
  logo: {
    alt: "Logo",
    height: 40,
    link: "/",
    src: logo,
  },
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
  socials: [
    {
      ...SOCIAL.TWITTER,
      url: "https://twitter.com",
    },
    {
      ...SOCIAL.YOUTUBE,
      url: "https://www.youtube.com",
    },
    {
      ...SOCIAL.DISCOURSE,
      url: "https://www.discourse.org/",
    },
    {
      ...SOCIAL.GITHUB,
      url: "https://github.com",
    },
  ],
};

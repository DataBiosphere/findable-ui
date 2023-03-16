import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import logo from "../../../../../../images/logo.svg";
import { Logo } from "./logo";

export default {
  argTypes: {
    logo: {
      alt: { control: "text" },
      height: { control: "number" },
      link: { control: "text" },
      src: { control: "text" },
      width: { control: "number" },
    },
  },
  component: Logo,
  title: "Components/Common/Image/Logo",
} as ComponentMeta<typeof Logo>;

const LogoTemplate: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const LogoStory = LogoTemplate.bind({});
LogoStory.args = {
  alt: "Data Explorer",
  height: 40,
  link: "/",
  src: logo,
};

import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import logo from "../../../images/logo.svg";
import { StaticImage } from "./staticImage";

export default {
  argTypes: {
    alt: { control: "text" },
    height: { control: "number" },
    src: { control: "text" },
    width: { control: "number" },
  },
  component: StaticImage,
  title: "Components/Common/Image/StaticImage",
} as ComponentMeta<typeof StaticImage>;

const StaticImageTemplate: ComponentStory<typeof StaticImage> = (args) => (
  <StaticImage {...args} />
);

export const StaticImageStory = StaticImageTemplate.bind({});
StaticImageStory.args = {
  alt: "Data Explorer",
  height: 40,
  src: logo,
};

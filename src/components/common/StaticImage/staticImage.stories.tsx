import { Meta, StoryObj } from "@storybook/react";
import logo from "../../../images/logo.svg";
import { StaticImage } from "./staticImage";

const meta = {
  argTypes: {
    alt: { control: "text" },
    height: { control: "number" },
    src: { control: "text" },
    width: { control: "number" },
  },
  component: StaticImage,
  title: "Components/Common/Image/StaticImage",
} satisfies Meta<typeof StaticImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StaticImageStory: Story = {
  args: {
    alt: "Data Explorer",
    height: 40,
    src: logo.src,
  },
};

import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Button } from "./button";
import { ButtonPrimary, ButtonSecondary } from "./button.styles";
import { NavLinkDropdownButton } from "./components/NavLinkDropdownButton/navLinkDropdownButton";

export default {
  argTypes: {
    children: { control: "text" },
  },
  component: Button,
  parameters: {
    layout: "centered",
  },
  title: "Components/Common/Button",
} as ComponentMeta<typeof Button>;

const PrimaryButtonTemplate: ComponentStory<typeof Button> = (args) => (
  <ButtonPrimary {...args} />
);

const SecondaryButtonTemplate: ComponentStory<typeof Button> = (args) => (
  <ButtonSecondary {...args} />
);

const NavDropdownButtonTemplate: ComponentStory<
  typeof NavLinkDropdownButton
> = (args) => <NavLinkDropdownButton {...args} />;

export const SecondaryButtonStory = SecondaryButtonTemplate.bind({});
SecondaryButtonStory.args = {
  children: "Secondary Button",
};

export const PrimaryButtonStory = PrimaryButtonTemplate.bind({});
PrimaryButtonStory.args = {
  children: "Primary Button",
};

export const NavDropdownButtonStory = NavDropdownButtonTemplate.bind({});
NavDropdownButtonStory.args = {
  children: "More",
};

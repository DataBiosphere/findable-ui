import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { HelpIconButton } from "../common/Button/components/HelpIconButton/helpIconButton";
import { Login } from "./login";

export default {
  argTypes: {
    isGoogle: { control: "boolean" },
    termsOfService: { control: "object" },
    text: { control: "object" },
    title: { control: "text" },
    warning: { control: "object" },
  },
  component: Login,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Login",
} as Meta<typeof Login>;

type Story = StoryObj<typeof Login>;

export const LoginStory: Story = {
  args: {
    isGoogle: true,
    termsOfService: (
      <p>I have read and agree to privacy notice and terms of use</p>
    ),
    text: (
      <p>
        Please sign in to your Data Explorer account{" "}
        <HelpIconButton url="https://www.google.com/" />
      </p>
    ),
    title: "Sign in to your account",
    warning: (
      <div>
        <p>WARNING NOTICE</p>
        <p>This is a warning notice.</p>
      </div>
    ),
  },
};

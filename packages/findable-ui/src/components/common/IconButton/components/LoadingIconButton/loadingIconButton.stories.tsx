import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { LoadingIconButton } from "./loadingIconButton";

export default {
  component: LoadingIconButton,
  title: "Components/Common/IconButton/Download",
} as ComponentMeta<typeof LoadingIconButton>;

const LoadingIconButtonTemplate: ComponentStory<
  typeof LoadingIconButton
> = () => <LoadingIconButton />;

export const LoadingIconButtonStory = LoadingIconButtonTemplate.bind({});
LoadingIconButtonStory.args = {};

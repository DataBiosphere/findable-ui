import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ProfileComponent } from "./profileComponent";

export default {
  component: ProfileComponent,
  title: "Components/Common/Button",
} as ComponentMeta<typeof ProfileComponent>;

const ProfileComponentTemplate: ComponentStory<
  typeof ProfileComponent
> = () => <ProfileComponent />;

export const ProfileComponentStory = ProfileComponentTemplate.bind({});
ProfileComponentStory.args = {};

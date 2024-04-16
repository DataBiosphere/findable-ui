import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Breadcrumbs } from "./breadcrumbs";

export default {
  argTypes: {
    children: { control: { disabled: true } },
  },
  component: Breadcrumbs,
  title: "Components/Common/BreadCrumbs",
} as ComponentMeta<typeof Breadcrumbs>;

const BreadcrumbTemplate: ComponentStory<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args} />
);

export const BreadcrumbDefaultStory = BreadcrumbTemplate.bind({});
BreadcrumbDefaultStory.args = {
  breadcrumbs: [
    {
      path: "#",
      text: "Home",
    },
    {
      path: "#",
      text: "Data Explorer",
    },
  ],
};

export const BreadcrumbCustomSeparatorStory = BreadcrumbTemplate.bind({});
BreadcrumbCustomSeparatorStory.args = {
  Separator: " | ",
  breadcrumbs: [
    {
      path: "#",
      text: "Home",
    },
    {
      path: "#",
      text: "Data Explorer",
    },
  ],
};

export const BreadcrumbWithLongerTitleStory = BreadcrumbTemplate.bind({});
BreadcrumbWithLongerTitleStory.args = {
  breadcrumbs: [
    {
      path: "#",
      text: "Explore",
    },
    {
      path: "#",
      text: "A Single-Cell Transcriptomic Map of the Human and Mouse Pancreas Reveals Inter- and Intra-cell Population Structure",
    },
  ],
};

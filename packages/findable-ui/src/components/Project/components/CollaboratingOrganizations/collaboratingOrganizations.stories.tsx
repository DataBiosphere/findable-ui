import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { CollaboratingOrganizations } from "./collaboratingOrganizations";

export default {
  argTypes: {
    collaboratingOrganizations: { control: "array" },
  },
  component: CollaboratingOrganizations,
  title: "Components/SectionContent/Content/Project",
} as ComponentMeta<typeof CollaboratingOrganizations>;

const CollaboratingOrganizationsTemplate: ComponentStory<
  typeof CollaboratingOrganizations
> = (args) => <CollaboratingOrganizations {...args} />;

export const CollaboratingOrganizationsStory =
  CollaboratingOrganizationsTemplate.bind({});
CollaboratingOrganizationsStory.args = {
  collaboratingOrganizations: [
    {
      citation: 1,
      name: "The Jackson Laboratory",
    },
    {
      citation: 2,
      name: "The New York Genome Center",
    },
    {
      citation: 3,
      name: "Weill Cornell Medicine",
    },
  ],
};

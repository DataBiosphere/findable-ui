import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { CollaboratingOrganizations } from "../Project/components/CollaboratingOrganizations/collaboratingOrganizations";
import { CollaboratingOrganizationsStory } from "../Project/components/CollaboratingOrganizations/collaboratingOrganizations.stories";
import { Contacts } from "../Project/components/Contacts/contacts";
import { ContactsStory } from "../Project/components/Contacts/contacts.stories";
import { Contributors } from "../Project/components/Contributors/contributors";
import { ContributorsStory } from "../Project/components/Contributors/contributors.stories";
import { DataCurators } from "../Project/components/DataCurators/dataCurators";
import { DataCuratorsStory } from "../Project/components/DataCurators/dataCurators.stories";
import { DataReleasePolicy } from "../Project/components/DataReleasePolicy/dataReleasePolicy";
import { Description } from "../Project/components/Description/description";
import { DescriptionStory } from "../Project/components/Description/description.stories";
import { Details } from "../Project/components/Details/details";
import { DetailsStory } from "../Project/components/Details/details.stories";
import { Publications } from "../Project/components/Publications/publications";
import { PublicationsStory } from "../Project/components/Publications/publications.stories";
import { SupplementaryLinks } from "../Project/components/SupplementaryLinks/supplementaryLinks";
import { SupplementaryLinksStory } from "../Project/components/SupplementaryLinks/supplementaryLinks.stories";
import { Detail } from "./detail";

const meta = {
  argTypes: {
    Tabs: { table: { disable: true } },
    isDetailOverview: { control: "boolean" },
    mainColumn: { table: { disable: true } },
    sideColumn: { table: { disable: true } },
    top: { table: { disable: true } },
  },
  component: Detail,
  parameters: {
    layout: "fullscreen",
  },
  title: "Views/EntityDetailView",
} satisfies Meta<typeof Detail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DetailStory: Story = {
  args: {
    isDetailOverview: true,
    mainColumn: (
      <>
        <Description
          projectDescription={
            DescriptionStory.args.projectDescription || "None"
          }
        />
        <Contacts {...ContactsStory.args} />
        <Publications {...PublicationsStory.args} />
        <Contributors {...ContributorsStory.args} />
        <CollaboratingOrganizations {...CollaboratingOrganizationsStory.args} />
        <DataCurators {...DataCuratorsStory.args} />
        <SupplementaryLinks {...SupplementaryLinksStory.args} />
        <DataReleasePolicy />
      </>
    ),
    sideColumn: (
      <>
        <Details {...DetailsStory.args} />
      </>
    ),
    top: <></>,
  },
};

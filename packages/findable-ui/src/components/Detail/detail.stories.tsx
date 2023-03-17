import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { BackPageHeroStory } from "../Layout/components/BackPage/components/BackPageHero/backPageHero.stories";
import { CollaboratingOrganizationsStory } from "../Project/components/CollaboratingOrganizations/collaboratingOrganizations.stories";
import { ContactsStory } from "../Project/components/Contacts/contacts.stories";
import { ContributorsStory } from "../Project/components/Contributors/contributors.stories";
import { DataCuratorsStory } from "../Project/components/DataCurators/dataCurators.stories";
import { DataReleasePolicyStory } from "../Project/components/DataReleasePolicy/dataReleasePolicy.stories";
import { DescriptionStory } from "../Project/components/Description/description.stories";
import { DetailsStory } from "../Project/components/Details/details.stories";
import { PublicationsStory } from "../Project/components/Publications/publications.stories";
import { SupplementaryLinksStory } from "../Project/components/SupplementaryLinks/supplementaryLinks.stories";
import { Detail } from "./detail";

export default {
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
} as ComponentMeta<typeof Detail>;

const DetailTemplate: ComponentStory<typeof Detail> = (args) => (
  <Detail {...args} />
);

export const DetailStory = DetailTemplate.bind({});
DetailStory.args = {
  isDetailOverview: true,
  mainColumn: (
    <>
      <DescriptionStory
        projectDescription={DescriptionStory.args?.projectDescription || "None"}
      />
      <ContactsStory {...ContactsStory.args} />
      <PublicationsStory {...PublicationsStory.args} />
      <ContributorsStory {...ContributorsStory.args} />
      <CollaboratingOrganizationsStory
        {...CollaboratingOrganizationsStory.args}
      />
      <DataCuratorsStory {...DataCuratorsStory.args} />
      {/*<CitationStory {...CitationStory.args} />*/}
      <SupplementaryLinksStory {...SupplementaryLinksStory.args} />
      <DataReleasePolicyStory />
    </>
  ),
  sideColumn: (
    <>
      <DetailsStory
        keyValuePairs={DetailsStory.args?.keyValuePairs}
        title={DetailsStory.args?.title ?? ""}
      />
    </>
  ),
  top: (
    <>
      <BackPageHeroStory {...BackPageHeroStory.args} />
    </>
  ),
};

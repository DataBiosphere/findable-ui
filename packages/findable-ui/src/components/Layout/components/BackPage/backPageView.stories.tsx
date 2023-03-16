import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { CollaboratingOrganizationsStory } from "../../../Project/components/CollaboratingOrganizations/collaboratingOrganizations.stories";
import { ContactsStory } from "../../../Project/components/Contacts/contacts.stories";
import { ContributorsStory } from "../../../Project/components/Contributors/contributors.stories";
import { DataCuratorsStory } from "../../../Project/components/DataCurators/dataCurators.stories";
import { DataReleasePolicyStory } from "../../../Project/components/DataReleasePolicy/dataReleasePolicy.stories";
import { DescriptionStory } from "../../../Project/components/Description/description.stories";
import { DetailsStory } from "../../../Project/components/Details/details.stories";
import { PublicationsStory } from "../../../Project/components/Publications/publications.stories";
import { SupplementaryLinksStory } from "../../../Project/components/SupplementaryLinks/supplementaryLinks.stories";
import { BackPageView } from "./backPageView";
import { BackPageHeroStory } from "./components/BackPageHero/backPageHero.stories";

export default {
  argTypes: {
    isDetailOverview: { control: "boolean" },
    mainColumn: { table: { disable: true } },
    sideColumn: { table: { disable: true } },
    top: { table: { disable: true } },
  },
  component: BackPageView,
  parameters: {
    layout: "fullscreen",
  },
  title: "Views/BackPage",
} as ComponentMeta<typeof BackPageView>;

const BackPageViewTemplate: ComponentStory<typeof BackPageView> = (args) => (
  <BackPageView {...args} />
);

export const BackPageViewStory = BackPageViewTemplate.bind({});
BackPageViewStory.args = {
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
        title={DetailsStory.args?.title ?? ""}
        keyValuePairs={DetailsStory.args?.keyValuePairs}
      />
    </>
  ),
  top: (
    <>
      <BackPageHeroStory {...BackPageHeroStory.args} />
    </>
  ),
};

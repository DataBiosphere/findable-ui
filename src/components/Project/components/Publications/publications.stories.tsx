import { Meta, StoryObj } from "@storybook/react";
import { Publications } from "./publications";

const meta = {
  component: Publications,
  title: "Components/SectionContent/Content/Project",
} satisfies Meta<typeof Publications>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PublicationsStory: Story = {
  args: {
    publications: [
      {
        doi: "10.1126/science.aay3224",
        officialHcaPublication: true,
        publicationTitle:
          "A cell atlas of human thymic development defines T cell repertoire formation.",
        publicationUrl: "https://www.science.org/doi/10.1126/science.aay3224",
      },
      {
        publicationTitle:
          "A revised airway epithelial hierarchy includes CFTR-expressing ionocytes.",
        publicationUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6295155/",
      },
    ],
  },
};

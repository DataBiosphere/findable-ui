import { Meta, StoryObj } from "@storybook/react";
import { Description } from "./description";

const meta = {
  component: Description,
  title: "Components/SectionContent/Content/Project",
} satisfies Meta<typeof Description>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DescriptionStory: Story = {
  args: {
    projectDescription:
      "Although the function of the mammalian pancreas hinges on complex interactions of distinct cell types, gene expression profiles have primarily been described with bulk mixtures. Here we implemented a droplet-based, single-cell RNA-seq method to determine the transcriptomes of over 12,000 individual pancreatic cells from four human donors and two mouse strains. Cells could be divided into 15 clusters that matched previously characterized cell types: all endocrine cell types, including rare epsilon-cells; exocrine cell types; vascular cells; Schwann cells; quiescent and activated stellate cells; and four types of immune cells. We detected subpopulations of ductal cells with distinct expression profiles and validated their existence with immuno-histochemistry stains. Moreover, among human beta- cells, we detected heterogeneity in the regulation of genes relating to functional maturation and levels of ER stress. Finally, we deconvolved bulk gene expression samples using the single-cell data to detect disease-associated differential expression. Our dataset provides a resource for the discovery of novel cell type-specific transcription factors, signaling receptors, and medically relevant genes.",
  },
};

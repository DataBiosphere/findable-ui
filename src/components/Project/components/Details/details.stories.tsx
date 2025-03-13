import { Meta, StoryObj } from "@storybook/react";
import { KeyValues } from "../../../common/KeyValuePairs/keyValuePairs";
import { Details } from "./details";

// Template constants
const details: KeyValues = new Map([
  ["Project Label", "HeterogeneityCD4TCells"],
  ["Species", "Homo sapiens"],
  ["Sample Type", "specimens"],
  ["Anatomical Entity", "eye"],
]);

const meta = {
  argTypes: {
    keyValuePairs: { control: "object" },
    title: { control: "text" },
  },
  component: Details,
  title: "Components/SectionContent/Content/Project",
} satisfies Meta<typeof Details>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DetailsStory: Story = {
  args: {
    keyValuePairs: details,
    title: "",
  },
};

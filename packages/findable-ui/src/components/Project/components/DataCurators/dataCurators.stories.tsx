import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { DataCurators } from "./dataCurators";

export default {
  argTypes: {
    dataCurators: { control: "array" },
  },
  component: DataCurators,
  title: "Components/SectionContent/Content/Project",
} as ComponentMeta<typeof DataCurators>;

const DataCuratorsTemplate: ComponentStory<typeof DataCurators> = (args) => (
  <DataCurators {...args} />
);

export const DataCuratorsStory = DataCuratorsTemplate.bind({});
DataCuratorsStory.args = {
  dataCurators: ["Schwartz Rachel", "William Sullivan", "Parisa Nejad"],
};

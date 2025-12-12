import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DataCurators } from "./dataCurators";

const meta = {
  argTypes: {
    dataCurators: { control: "object" },
  },
  component: DataCurators,
  title: "Components/SectionContent/Content/Project",
} satisfies Meta<typeof DataCurators>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DataCuratorsStory: Story = {
  args: {
    dataCurators: ["Schwartz Rachel", "William Sullivan", "Parisa Nejad"],
  },
};

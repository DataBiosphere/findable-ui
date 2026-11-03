import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ColumnVisibilityPresets } from "../columnVisibilityPresets";
import { StoryTable } from "./storyTable";

const meta: Meta<typeof ColumnVisibilityPresets> = {
  component: ColumnVisibilityPresets,
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The first preset is applied on load. Choosing a preset shows its columns.
 */
export const Default: Story = {
  render: () => <StoryTable />,
};

/**
 * The table is grouped by organism, so "Quality", which hides organism, is unavailable; its tooltip says to ungroup
 * Organism.
 */
export const Grouped: Story = {
  render: () => <StoryTable grouping={["organism"]} />,
};

/**
 * The visible columns match no preset, so none is selected. Choosing a preset shows its columns again.
 */
export const ColumnsChanged: Story = {
  render: () => (
    <StoryTable initialColumnVisibility={{ contigN50: false, level: false }} />
  ),
};

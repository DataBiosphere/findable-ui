import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { GridPaper } from "../../../../../../common/Paper/paper.styles";
import { FilterSummary } from "../filterSummary";
import { FILTER_SUMMARY_ARGS } from "./args";

const meta: Meta<typeof FilterSummary> = {
  args: FILTER_SUMMARY_ARGS,
  component: FilterSummary,
  decorators: [
    (Story, context): JSX.Element => (
      <GridPaper>
        <Story {...context} />
      </GridPaper>
    ),
  ],
  parameters: { layout: "fullscreen" },
  title: "Components/Entities/EntitiesView/FilterSummary",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

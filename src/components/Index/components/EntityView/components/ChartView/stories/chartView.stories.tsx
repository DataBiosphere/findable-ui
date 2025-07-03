import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { GridPaper } from "../../../../../../common/Paper/paper.styles";
import { ChartView } from "../chartView";
import { CHART_VIEW_ARGS } from "./args";

const meta: Meta<typeof ChartView> = {
  args: CHART_VIEW_ARGS,
  component: ChartView,
  decorators: [
    (Story, context): JSX.Element => (
      <GridPaper>
        <Story {...context} />
      </GridPaper>
    ),
  ],
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

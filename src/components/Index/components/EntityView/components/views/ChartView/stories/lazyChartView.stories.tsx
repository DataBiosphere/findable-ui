import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import { GridPaper } from "../../../../../../../common/Paper/paper.styles";
import { LazyChartView } from "../lazyChartView";
import { CHART_VIEW_ARGS } from "./args";

const meta: Meta<typeof LazyChartView> = {
  args: CHART_VIEW_ARGS,
  component: LazyChartView,
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

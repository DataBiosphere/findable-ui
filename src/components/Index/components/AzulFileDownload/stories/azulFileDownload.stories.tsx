import { Tooltip } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AzulFileDownload } from "../azulFileDownload";

const meta: Meta<typeof AzulFileDownload> = {
  args: {
    entityName: "",
    relatedEntityId: "",
    relatedEntityName: "",
    url: "https://service.dev.singlecell.gi.ucsc.edu/repository/files/d496b624-eb67-5e47-999a-848e856c5bcc?catalog=dcp2&version=2021-09-10T16%3A09%3A44.000000Z",
  },
  component: AzulFileDownload,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {};

/**
 * Without a file URL there is nothing to request, so the button is genuinely
 * disabled and drops out of the tab order.
 */
export const NO_URL: Story = { args: { url: undefined } };

/**
 * As a Tooltip child, the way sites render the Files download column. Hovering
 * or focusing the button shows the tooltip.
 */
export const WITH_TOOLTIP: Story = {
  render: (args) => (
    <Tooltip arrow title="This open-access file is freely downloadable.">
      <AzulFileDownload {...args} />
    </Tooltip>
  ),
};

/**
 * As a Tooltip child without a file URL. The disabled button can't be hovered,
 * so the tooltip opens from the outer span.
 */
export const WITH_TOOLTIP_NO_URL: Story = {
  args: { url: undefined },
  render: (args) => (
    <Tooltip
      arrow
      title="Direct file downloads are currently only available for open-access files."
    >
      <AzulFileDownload {...args} />
    </Tooltip>
  ),
};

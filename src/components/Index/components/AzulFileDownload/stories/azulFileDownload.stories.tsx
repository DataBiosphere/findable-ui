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

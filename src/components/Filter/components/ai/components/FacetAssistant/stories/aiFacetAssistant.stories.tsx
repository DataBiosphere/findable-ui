import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { FacetAssistant } from "../facetAssistant";

const meta: Meta<typeof FacetAssistant> = {
  component: FacetAssistant,
  decorators: [
    (Story): JSX.Element => (
      <Box sx={{ width: 264 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {};

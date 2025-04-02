import { Box } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";
import { LOREM_IPSUM } from "../../../../../storybook/loremIpsum";
import { EntitiesView } from "../entitiesView";

const meta: Meta<typeof EntitiesView> = {
  args: {
    onChange: fn(),
    viewStatus: { disabled: true, isTableView: true },
  },
  component: EntitiesView,
  title: "Components/Entities/EntitiesView",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Box
        sx={{
          backgroundColor: "white",
          maxWidth: "800px",
          padding: 5,
          width: "100%",
        }}
      >
        {LOREM_IPSUM.LONG}
      </Box>
    ),
  },
};

export const FilterView: Story = {
  args: {
    children: (
      <Box
        sx={{
          backgroundColor: "white",
          maxWidth: "800px",
          padding: 5,
          width: "100%",
        }}
      >
        {LOREM_IPSUM.SHORT}
      </Box>
    ),
    viewStatus: { disabled: false, isTableView: false },
  },
};

export const TableView: Story = {
  args: {
    children: (
      <Box
        sx={{
          backgroundColor: "white",
          maxWidth: "800px",
          padding: 5,
          width: "100%",
        }}
      >
        {LOREM_IPSUM.SHORT}
      </Box>
    ),
    viewStatus: { disabled: false, isTableView: true },
  },
};

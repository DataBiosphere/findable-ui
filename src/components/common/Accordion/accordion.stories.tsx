import { Box } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Accordion } from "./accordion";

export default {
  component: Accordion,
  title: "Components/Common/Accordion",
} as Meta<typeof Accordion>;

type Story = StoryObj<typeof Accordion>;

export const AccordionStory: Story = {
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    title: "CSER Phase II Harmonized Measures",
  },
};

export const AccordionsStory: Story = {
  render: () => (
    <Box bgcolor="white">
      <Accordion title={AccordionStory.args?.title || ""}>
        {AccordionStory.args?.children || ""}
      </Accordion>
      <Accordion title={"Information about the CSER1 Consortium"}>
        {AccordionStory.args?.children || ""}
      </Accordion>
      <Accordion title={"Genetic and genomic online CME courses"}>
        {AccordionStory.args?.children || ""}
      </Accordion>
    </Box>
  ),
};

import { Typography } from "@mui/material";
import React from "react";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { Description as ProjectDescription } from "../../common/entities";

export interface DescriptionProps {
  projectDescription: ProjectDescription;
}

export const Description = ({
  projectDescription,
}: DescriptionProps): JSX.Element => {
  return (
    <CollapsableSection title={"Description"}>
      <Typography>{projectDescription}</Typography>
    </CollapsableSection>
  );
};

import { Typography } from "@mui/material";
import { JSX } from "react";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { Description as ProjectDescription } from "../../common/entities";

/**
 * Props for the Description component.
 */
export interface DescriptionProps {
  projectDescription: ProjectDescription;
}

/**
 * Description section of a project page.
 * @param props - Component props.
 * @param props.projectDescription - Project description.
 * @returns The description section.
 */
export const Description = ({
  projectDescription,
}: DescriptionProps): JSX.Element => {
  return (
    <CollapsableSection title={"Description"}>
      <Typography>{projectDescription}</Typography>
    </CollapsableSection>
  );
};

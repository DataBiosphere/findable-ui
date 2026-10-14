import { JSX } from "react";
import { StyledFluidPaper, StyledMarkdownRenderer } from "./description.styles";
import { DescriptionProps } from "./types";

/**
 * Data dictionary description, rendered as markdown on a fluid paper.
 * @param props - Component props.
 * @param props.description - Markdown description.
 * @returns The description, or null when the description is empty or not given.
 */
export const Description = ({
  description,
}: DescriptionProps): JSX.Element | null => {
  if (!description) return null;
  return (
    <StyledFluidPaper elevation={0}>
      <StyledMarkdownRenderer value={description} />
    </StyledFluidPaper>
  );
};

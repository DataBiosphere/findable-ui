import React from "react";
import { StyledFluidPaper, StyledMarkdownRenderer } from "./description.styles";
import { DescriptionProps } from "./types";

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

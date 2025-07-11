import React from "react";
import {
  StyledMarkdownRenderer,
  StyledRoundedPaper,
} from "./description.styles";
import { DescriptionProps } from "./types";

export const Description = ({
  description,
}: DescriptionProps): JSX.Element | null => {
  if (!description) return null;
  return (
    <StyledRoundedPaper elevation={0}>
      <StyledMarkdownRenderer value={description} />
    </StyledRoundedPaper>
  );
};

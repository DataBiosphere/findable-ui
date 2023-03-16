import React from "react";

export interface SectionDetailsEmptyProps {
  displayText?: string;
}

export const SectionDetailsEmpty = ({
  displayText = "None",
}: SectionDetailsEmptyProps): JSX.Element => {
  return <span>{displayText}</span>;
};

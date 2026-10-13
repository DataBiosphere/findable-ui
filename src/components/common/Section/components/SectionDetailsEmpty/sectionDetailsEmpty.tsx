import { JSX } from "react";

/**
 * Props for the SectionDetailsEmpty component.
 */
export interface SectionDetailsEmptyProps {
  displayText?: string;
}

/**
 * Placeholder text for a section with no details.
 * @param props - Component props.
 * @param props.displayText - Text to display; defaults to "None".
 * @returns The empty section details text.
 */
export const SectionDetailsEmpty = ({
  displayText = "None",
}: SectionDetailsEmptyProps): JSX.Element => {
  return <span>{displayText}</span>;
};

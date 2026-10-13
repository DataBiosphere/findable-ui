import {
  AccordionDetails,
  AccordionSummary,
  Accordion as MAccordion,
  AccordionProps as MAccordionProps,
  Typography,
} from "@mui/material";
import { JSX, ReactNode, useState } from "react";
import { TYPOGRAPHY_PROPS } from "../../../styles/common/mui/typography";
import { AddIcon } from "../CustomIcon/components/AddIcon/addIcon";
import { RemoveIcon } from "../CustomIcon/components/RemoveIcon/removeIcon";

/**
 * Props for the Accordion component.
 */
export interface AccordionProps extends MAccordionProps {
  collapseIcon?: ReactNode;
  expandIcon?: ReactNode;
  title: string;
}

/**
 * Accordion with a title summary, managing its own expanded state and swapping the expand and collapse icons on toggle.
 * @param props - Component props.
 * @param props.children - Accordion details content.
 * @param props.collapseIcon - Icon shown when the accordion is expanded; defaults to a primary remove icon.
 * @param props.expanded - Initial expanded state; defaults to collapsed.
 * @param props.expandIcon - Icon shown when the accordion is collapsed; defaults to a primary add icon.
 * @param props.title - Accordion summary title.
 * @returns The accordion.
 */
export const Accordion = ({
  children,
  collapseIcon = <RemoveIcon color="primary" fontSize="medium" />,
  expanded,
  expandIcon = <AddIcon color="primary" fontSize="medium" />,
  title,
  ...props /* Spread props to allow for Accordion specific props AccordionProps e.g. "disabled". */
}: AccordionProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(expanded || false);

  const onToggleExpanded = (): void => {
    setIsExpanded((expanded) => !expanded);
  };

  return (
    <MAccordion expanded={isExpanded} onChange={onToggleExpanded} {...props}>
      <AccordionSummary expandIcon={isExpanded ? collapseIcon : expandIcon}>
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MAccordion>
  );
};

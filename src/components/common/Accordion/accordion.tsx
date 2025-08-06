import {
  AccordionDetails,
  AccordionSummary,
  Accordion as MAccordion,
  AccordionProps as MAccordionProps,
  Typography,
} from "@mui/material";
import React, { ReactNode, useState } from "react";
import { TYPOGRAPHY_PROPS } from "../../../styles/common/mui/typography";
import { AddIcon } from "../CustomIcon/components/AddIcon/addIcon";
import { RemoveIcon } from "../CustomIcon/components/RemoveIcon/removeIcon";

export interface AccordionProps extends MAccordionProps {
  collapseIcon?: ReactNode;
  expandIcon?: ReactNode;
  title: string;
}

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
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_LARGE_500}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MAccordion>
  );
};

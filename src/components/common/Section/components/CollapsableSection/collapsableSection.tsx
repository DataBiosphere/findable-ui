import { AddRounded, RemoveRounded } from "@mui/icons-material";
import { Collapse, CollapseProps } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../hooks/useBreakpointHelper";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
import { TABLET } from "../../../../../theme/common/breakpoints";
import { SectionTitle } from "../SectionTitle/sectionTitle";
import {
  CollapsableSection as Section,
  SectionSummary,
  SectionText,
} from "./collapsableSection.styles";

export interface CollapsableSectionProps {
  children: ReactNode;
  collapsable?: boolean;
  title: string;
}

export const CollapsableSection = ({
  children,
  collapsable = false,
  title,
}: CollapsableSectionProps): JSX.Element => {
  const mobile = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, TABLET);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [transitionDuration, setTransitionDuration] =
    useState<CollapseProps["timeout"]>(0);
  const disabled = !mobile || !collapsable;
  const ExpandIcon = expanded ? RemoveRounded : AddRounded;
  const SectionContent = (
    <SectionText
      component="div"
      variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400_2_LINES}
    >
      {children}
    </SectionText>
  );

  const onToggleExpanded = (): void => {
    setExpanded((expanded) => !expanded);
  };

  // Toggles expanded state on change of media breakpoint.
  useEffect(() => {
    setExpanded(!mobile);
  }, [mobile]);

  // Sets collapseTimeout state on change of media breakpoint.
  // Delays setting transitionDuration state for mobile breakpoint to facilitate the immediate transition from
  // tablet to mobile.
  useEffect(() => {
    if (mobile) {
      const duration = setTimeout(() => {
        setTransitionDuration("auto");
      }, 100);
      return (): void => {
        clearTimeout(duration);
      };
    } else {
      setTransitionDuration(0);
    }
  }, [mobile]);

  return (
    <Section>
      <SectionSummary disabled={disabled} onClick={onToggleExpanded}>
        <SectionTitle title={title} />
        {!disabled && <ExpandIcon fontSize="small" />}
      </SectionSummary>
      {!disabled ? (
        <Collapse in={expanded} timeout={transitionDuration}>
          {SectionContent}
        </Collapse>
      ) : (
        SectionContent
      )}
    </Section>
  );
};

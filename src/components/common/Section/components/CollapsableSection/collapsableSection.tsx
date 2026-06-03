import { AddRounded, RemoveRounded } from "@mui/icons-material";
import { Collapse, CollapseProps } from "@mui/material";
import { JSX, ReactNode, useState } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../hooks/useBreakpointHelper";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
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
  const bpDownSm = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, "sm");
  const [expanded, setExpanded] = useState<boolean>(!bpDownSm);
  const [transitionDuration, setTransitionDuration] =
    useState<CollapseProps["timeout"]>("auto");
  const [prevBpDownSm, setPrevBpDownSm] = useState(bpDownSm);
  // Adjust-during-render: when the breakpoint flips, reset `expanded` to
  // match (the section auto-expands on desktop, auto-collapses on mobile)
  // and drop `transitionDuration` to 0 so the breakpoint-driven open/close
  // is instant. The Collapse's onEntered / onExited callbacks (below)
  // restore "auto" once the instant transition completes, so subsequent
  // user-triggered toggles animate smoothly. React discards the in-progress
  // render when these setters fire — no flash, single commit.
  if (bpDownSm !== prevBpDownSm) {
    setPrevBpDownSm(bpDownSm);
    setExpanded(!bpDownSm);
    setTransitionDuration(0);
  }
  const disabled = !bpDownSm || !collapsable;
  const ExpandIcon = expanded ? RemoveRounded : AddRounded;
  const SectionContent = (
    <SectionText
      component="div"
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400_2_LINES}
    >
      {children}
    </SectionText>
  );

  const onToggleExpanded = (): void => {
    setExpanded((expanded) => !expanded);
  };

  return (
    <Section>
      <SectionSummary disabled={disabled} onClick={onToggleExpanded}>
        <SectionTitle title={title} />
        {!disabled && <ExpandIcon fontSize="small" />}
      </SectionSummary>
      <Collapse
        in={disabled || expanded}
        onEntered={() => setTransitionDuration("auto")}
        onExited={() => setTransitionDuration("auto")}
        timeout={transitionDuration}
      >
        {SectionContent}
      </Collapse>
    </Section>
  );
};

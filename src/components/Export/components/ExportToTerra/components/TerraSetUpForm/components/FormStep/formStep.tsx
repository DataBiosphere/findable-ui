import { StepIcon, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import {
  TEXT_BODY_400_2_LINES,
  TEXT_BODY_500,
} from "../../../../../../../../theme/common/typography";
import { FormStatusCompletedIcon } from "../../../../../../../common/CustomIcon/components/FormStatusCompletedIcon/formStatusCompletedIcon";
import {
  Section,
  SectionActions,
  SectionStatus,
} from "../../terraSetUpForm.styles";
import { SectionContent } from "./formStep.styles";

export interface FormStepProps {
  action: ReactNode;
  active: boolean;
  completed: boolean;
  step: ReactNode;
  text: ReactNode;
  title: string;
}

export const FormStep = ({
  action,
  active,
  completed,
  step,
  text,
  title,
}: FormStepProps): JSX.Element => {
  return (
    <Section>
      <SectionStatus>
        <StepIcon
          active={active}
          completed={completed}
          icon={
            completed ? <FormStatusCompletedIcon fontSize="medium" /> : step
          }
        />
      </SectionStatus>
      <SectionContent>
        <Typography
          color={active ? "ink.main" : "ink.light"}
          component="h4"
          variant={TEXT_BODY_500}
        >
          {title}
        </Typography>
        {active && (
          <Typography
            color="ink.light"
            component="div"
            variant={TEXT_BODY_400_2_LINES}
          >
            {text}
          </Typography>
        )}
      </SectionContent>
      {active && <SectionActions>{action}</SectionActions>}
    </Section>
  );
};

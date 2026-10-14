import { StepIcon, Typography } from "@mui/material";
import { JSX, ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../styles/common/mui/typography";
import { FormStatusCompletedIcon } from "../../../../../../../common/CustomIcon/components/FormStatusCompletedIcon/formStatusCompletedIcon";
import { SectionActions, SectionStatus } from "../../terraSetUpForm.styles";
import { Section, SectionContent } from "./formStep.styles";

/**
 * Props for the FormStep component.
 */
export interface FormStepProps {
  action: ReactNode;
  active: boolean;
  completed: boolean;
  step: ReactNode;
  text: ReactNode;
  title: string;
}

/**
 * Terra setup step: a step icon and title, with the text and action shown
 * only while the step is active.
 * @param props - Component props.
 * @param props.action - Action shown while the step is active.
 * @param props.active - Whether the step is the current step.
 * @param props.completed - Whether the step is done; shows a completed icon in place of the step number.
 * @param props.step - Step number.
 * @param props.text - Text shown while the step is active.
 * @param props.title - Step title.
 * @returns The setup step.
 */
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
          color={
            active
              ? TYPOGRAPHY_PROPS.COLOR.INK_MAIN
              : TYPOGRAPHY_PROPS.COLOR.INK_LIGHT
          }
          component="h4"
          variant={TYPOGRAPHY_PROPS.VARIANT.BODY_500}
        >
          {title}
        </Typography>
        {active && (
          <Typography
            color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
            component="div"
            variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400_2_LINES}
          >
            {text}
          </Typography>
        )}
      </SectionContent>
      {active && <SectionActions>{action}</SectionActions>}
    </Section>
  );
};

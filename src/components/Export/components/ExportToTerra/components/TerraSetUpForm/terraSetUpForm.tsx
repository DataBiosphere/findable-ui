import { Collapse, Stack, Typography } from "@mui/material";
import { JSX } from "react";
import { useAuth } from "../../../../../../auth/hooks/useAuth";
import { AUTH_STATUS } from "../../../../../../auth/types/auth";
import {
  ONBOARDING_STEP,
  OnboardingStatus,
  useAuthenticationForm,
} from "../../../../../../hooks/authentication/terra/useAuthenticationForm";
import { STACK_PROPS } from "../../../../../../styles/common/mui/stack";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { useTerraSetUpUI } from "../../../../../../terra/setUpUI/provider/hook";
import { SectionTitle } from "../../../../../common/Section/components/SectionTitle/sectionTitle";
import { Button } from "./components/Button/button";
import { AcceptTerraTOS } from "./components/FormStep/components/AcceptTerraTOS/acceptTerraTOS";
import { ConnectTerraToNIHAccount } from "./components/FormStep/components/ConnectTerraToNIHAccount/connectTerraToNIHAccount";
import { CreateTerraAccount } from "./components/FormStep/components/CreateTerraAccount/createTerraAccount";
import { StyledFluidPaper, StyledStack } from "./terraSetUpForm.styles";
import { TerraSetUpFormProps } from "./types";

export const TerraSetUpForm = ({
  collapsible = false,
}: TerraSetUpFormProps): JSX.Element | null => {
  const {
    authState: { isAuthenticated, status },
  } = useAuth();
  const { isComplete, onboardingStatusByStep } = useAuthenticationForm();
  const { isOpen } = useTerraSetUpUI();

  if (!isAuthenticated) return null;
  if (status === AUTH_STATUS.PENDING) return null;
  if (isComplete) return null;

  return (
    <StyledFluidPaper>
      <StyledStack direction={STACK_PROPS.DIRECTION.ROW} useFlexGap>
        <Stack gap={1} useFlexGap>
          <SectionTitle title="Complete your setup" />
          <Typography
            color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
            variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400_2_LINES}
          >
            Follow these steps to unlock the full potential of the data
            explorer.
          </Typography>
        </Stack>
        <Button collapsible={collapsible} />
      </StyledStack>
      <Collapse in={collapsible ? isOpen : true}>
        <CreateTerraAccount
          active={isStepActive(
            onboardingStatusByStep,
            ONBOARDING_STEP.TERRA_ACCOUNT,
          )}
          completed={isStepCompleted(
            onboardingStatusByStep,
            ONBOARDING_STEP.TERRA_ACCOUNT,
          )}
          step={ONBOARDING_STEP.TERRA_ACCOUNT}
        />
        <AcceptTerraTOS
          active={isStepActive(
            onboardingStatusByStep,
            ONBOARDING_STEP.TERRA_TOS,
          )}
          completed={isStepCompleted(
            onboardingStatusByStep,
            ONBOARDING_STEP.TERRA_TOS,
          )}
          step={ONBOARDING_STEP.TERRA_TOS}
        />
        {onboardingStatusByStep.has(ONBOARDING_STEP.NIH_ACCOUNT) && (
          <ConnectTerraToNIHAccount
            active={isStepActive(
              onboardingStatusByStep,
              ONBOARDING_STEP.NIH_ACCOUNT,
            )}
            completed={isStepCompleted(
              onboardingStatusByStep,
              ONBOARDING_STEP.NIH_ACCOUNT,
            )}
            step={ONBOARDING_STEP.NIH_ACCOUNT}
          />
        )}
      </Collapse>
    </StyledFluidPaper>
  );
};

/**
 * Returns true if the step is active.
 * @param onboardingStatusByStep - Map of onboarding steps and their status.
 * @param onboardingStep - Onboarding step.
 * @returns true if the step is active.
 */
function isStepActive(
  onboardingStatusByStep: Map<ONBOARDING_STEP, OnboardingStatus>,
  onboardingStep: ONBOARDING_STEP,
): boolean {
  return onboardingStatusByStep.get(onboardingStep)?.active || false;
}

/**
 * Returns true if the step is completed.
 * @param onboardingStatusByStep - Map of onboarding steps and their status.
 * @param onboardingStep - Onboarding step.
 * @returns true if the step is completed.
 */
function isStepCompleted(
  onboardingStatusByStep: Map<ONBOARDING_STEP, OnboardingStatus>,
  onboardingStep: ONBOARDING_STEP,
): boolean {
  return onboardingStatusByStep.get(onboardingStep)?.completed || false;
}

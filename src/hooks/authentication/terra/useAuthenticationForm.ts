import { useTerraProfile } from "../../../providers/authentication/terra/hook";
import {
  LoginResponse,
  LoginStatus,
} from "../../../providers/authentication/terra/hooks/common/entities";
import { TerraProfileContextProps } from "../../../providers/authentication/terra/types";

export interface OnboardingStatus {
  active: boolean;
  completed: boolean;
}

export enum ONBOARDING_STEP {
  NIH_ACCOUNT = 3,
  TERRA_ACCOUNT = 1,
  TERRA_TOS = 2,
}

interface UseAuthenticationForm {
  isComplete: boolean;
  onboardingStatusByStep: Map<ONBOARDING_STEP, OnboardingStatus>;
}

/**
 * Handles authentication form onboarding.
 * @returns onboarding steps and corresponding status.
 */
export const useAuthenticationForm = (): UseAuthenticationForm => {
  const terraProfile = useTerraProfile();
  const loginStatuses =
    concatLoginStatuses(terraProfile).filter(filterLoginStatus);
  const onboardingStatusByStep = getOnboardingStatusByStep(loginStatuses);
  const isComplete = isAuthenticationComplete(onboardingStatusByStep);
  return {
    isComplete,
    onboardingStatusByStep,
  };
};

/**
 * Returns true if all authentication steps are complete.
 * @param onboardingStatusByStep - Onboarding status by step.
 * @returns true if all authentication steps are complete.
 */
function isAuthenticationComplete(
  onboardingStatusByStep: Map<ONBOARDING_STEP, OnboardingStatus>
): boolean {
  for (const { completed } of onboardingStatusByStep.values()) {
    if (!completed) {
      return false;
    }
  }
  return true;
}

/**
 * Returns all login statuses, ordered by onboarding step.
 * @param terraProfile - Terra profile.
 * @returns login statuses.
 */
function concatLoginStatuses(
  terraProfile: TerraProfileContextProps
): LoginStatus<LoginResponse>[] {
  const {
    terraNIHProfileLoginStatus,
    terraProfileLoginStatus,
    terraTOSLoginStatus,
  } = terraProfile;
  return [
    terraProfileLoginStatus,
    terraTOSLoginStatus,
    terraNIHProfileLoginStatus,
  ];
}

/**
 * Returns true if login is supported.
 * @param loginStatus - Login status.
 * @returns true if login is supported.
 */
function filterLoginStatus(loginStatus: LoginStatus<LoginResponse>): boolean {
  return loginStatus.isSupported;
}

/**
 * Returns a map of onboarding steps and their status.
 * @param loginStatuses - Login statuses.
 * @returns map of onboarding steps and their status.
 */
function getOnboardingStatusByStep(
  loginStatuses: LoginStatus<LoginResponse>[]
): Map<ONBOARDING_STEP, OnboardingStatus> {
  const onboardingStatusByStep = new Map();
  for (let i = 0; i < loginStatuses.length; i++) {
    const { isSuccess } = loginStatuses[i];
    onboardingStatusByStep.set(i + 1, {
      active: isStepActive(isSuccess, onboardingStatusByStep),
      completed: isSuccess,
    });
  }
  return onboardingStatusByStep;
}

/**
 * Returns true if step is active.
 * @param isSuccess - Response is successful.
 * @param onboardingStatusByStep - Onboarding status by step.
 * @returns true if step is active.
 */
function isStepActive(
  isSuccess: boolean,
  onboardingStatusByStep: Map<ONBOARDING_STEP, OnboardingStatus>
): boolean {
  for (const { active } of onboardingStatusByStep.values()) {
    if (active) {
      return false;
    }
  }
  return !isSuccess;
}

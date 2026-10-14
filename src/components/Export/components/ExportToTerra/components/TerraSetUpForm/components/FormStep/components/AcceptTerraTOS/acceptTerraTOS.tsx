import { JSX, ReactNode } from "react";
import { useConfig } from "../../../../../../../../../../hooks/useConfig";
import { useTerraProfile } from "../../../../../../../../../../terra/hooks/useTerraProfile";
import { LoginStatus } from "../../../../../../../../../../terra/types/common";
import { TerraResponse } from "../../../../../../../../../../terra/types/terra-profile";
import { ButtonPrimary } from "../../../../../../../../../common/Button/components/ButtonPrimary/buttonPrimary";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../../../../../../Links/common/entities";
import { FormStep } from "../../formStep";

/**
 * Props for the AcceptTerraTOS component.
 */
export interface AcceptTerraTOSProps {
  active: boolean;
  completed: boolean;
  step: ReactNode;
}

/**
 * Terra setup step to accept the Terra terms of service, with a button that
 * opens the configured Terra URL in a new tab. Its text asks the user to
 * accept the updated terms when they accepted an earlier version.
 * @param props - Component props.
 * @param props.active - Whether the step is the current step; shows its text and button.
 * @param props.completed - Whether the step is done.
 * @param props.step - Step number.
 * @returns The terms of service step.
 */
export const AcceptTerraTOS = ({
  active,
  completed,
  step,
}: AcceptTerraTOSProps): JSX.Element | null => {
  const { config } = useConfig();
  const { exportToTerraUrl } = config;
  const { terraProfileLoginStatus } = useTerraProfile();
  const isTOSAccepted = isTermsOfServiceAccepted(terraProfileLoginStatus);

  const onOpenTerra = (): void => {
    if (exportToTerraUrl) {
      window.open(
        exportToTerraUrl,
        ANCHOR_TARGET.BLANK,
        REL_ATTRIBUTE.NO_OPENER_NO_REFERRER,
      );
    }
  };

  return (
    <FormStep
      action={<ButtonPrimary onClick={onOpenTerra}>Go to Terra</ButtonPrimary>}
      active={active}
      completed={completed}
      step={step}
      text={
        isTOSAccepted ? (
          <p>
            {/* Only show reminder to re-accept TOS if the accepted terms of service version is not current.
            Accepted TOS imply the version is not current. */}
            Terra&apos;s terms of service have changed. Please login to Terra to
            accept the updated terms of service.
          </p>
        ) : (
          <p>
            For full access to the Data Explorer, please sign in to Terra and
            review and accept the Terra terms of service when prompted.
          </p>
        )
      }
      title="Accept the Terra terms of service"
    />
  );
};

/**
 * Returns true if the terms of service have been accepted.
 * @param terraProfileLoginStatus - Terra profile login status.
 * @returns true if the terms of service have been accepted.
 */
function isTermsOfServiceAccepted(
  terraProfileLoginStatus: LoginStatus<TerraResponse>,
): boolean {
  return Boolean(terraProfileLoginStatus.response?.enabled?.tosAccepted);
}

import { JSX, ReactNode } from "react";
import { ButtonPrimary } from "../../../../../../../../../common/Button/components/ButtonPrimary/buttonPrimary";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../../../../../../Links/common/entities";
import { FormStep } from "../../formStep";

/**
 * Props for the ConnectTerraToNIHAccount component.
 */
export interface ConnectTerraToNIHAccountProps {
  active: boolean;
  completed: boolean;
  step: ReactNode;
}

/**
 * Terra setup step to connect the Terra account to an NIH Researcher Auth
 * Service (RAS) account, with a button that opens the Terra tutorial in a new
 * tab.
 * @param props - Component props.
 * @param props.active - Whether the step is the current step; shows its text and button.
 * @param props.completed - Whether the step is done.
 * @param props.step - Step number.
 * @returns The NIH account step.
 */
export const ConnectTerraToNIHAccount = ({
  active,
  completed,
  step,
}: ConnectTerraToNIHAccountProps): JSX.Element | null => {
  const onGotoTutorial = (): void => {
    window.open(
      "https://support.terra.bio/hc/en-us/articles/32634034451099-RAS-Integration-for-AnVIL-Data-Launching-3-25-26",
      ANCHOR_TARGET.BLANK,
      REL_ATTRIBUTE.NO_OPENER_NO_REFERRER,
    );
  };
  return (
    <FormStep
      action={
        <ButtonPrimary onClick={onGotoTutorial}>Go to Tutorial</ButtonPrimary>
      }
      active={active}
      completed={completed}
      step={step}
      text={
        <p>
          Next, connect your Terra account to your NIH Researcher Auth Service
          (RAS) account by following the tutorial below.
        </p>
      }
      title="Connect Terra to your NIH Researcher Auth Service (RAS) account"
    />
  );
};

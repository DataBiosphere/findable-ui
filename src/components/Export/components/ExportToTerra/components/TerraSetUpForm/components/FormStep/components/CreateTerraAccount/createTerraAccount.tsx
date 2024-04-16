import React, { ReactNode } from "react";
import { useConfig } from "../../../../../../../../../../hooks/useConfig";
import { ButtonPrimary } from "../../../../../../../../../common/Button/components/ButtonPrimary/buttonPrimary";
import { ANCHOR_TARGET } from "../../../../../../../../../Links/common/entities";
import { FormStep } from "../../formStep";

export interface CreateTerraAccountProps {
  active: boolean;
  completed: boolean;
  step: ReactNode;
}

export const CreateTerraAccount = ({
  active,
  completed,
  step,
}: CreateTerraAccountProps): JSX.Element | null => {
  const { config } = useConfig();
  const { exportToTerraUrl } = config;

  const onOpenTerra = (): void => {
    if (exportToTerraUrl) {
      window.open(exportToTerraUrl, ANCHOR_TARGET.BLANK, "noopener noreferrer");
    }
  };

  return (
    <FormStep
      action={<ButtonPrimary onClick={onOpenTerra}>Go to Terra</ButtonPrimary>}
      active={active}
      completed={completed}
      step={step}
      text={
        <p>
          Create a Terra account using the same email that you used to log in to
          data explorer.
        </p>
      }
      title="Create a Terra account"
    />
  );
};

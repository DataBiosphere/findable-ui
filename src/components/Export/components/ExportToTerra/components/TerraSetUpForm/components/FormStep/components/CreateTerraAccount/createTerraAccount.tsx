import { Button } from "@mui/material";
import { JSX, ReactNode } from "react";
import { BUTTON_PRESETS } from "../../../../../../../../../../contracts/mui/Button/presets";
import { useConfig } from "../../../../../../../../../../hooks/useConfig";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../../../../../../Links/common/entities";
import { FormStep } from "../../formStep";

/**
 * Props for the CreateTerraAccount component.
 */
export interface CreateTerraAccountProps {
  active: boolean;
  completed: boolean;
  step: ReactNode;
}

/**
 * Terra setup step to create a Terra account, with a button that opens the
 * configured Terra URL in a new tab.
 * @param props - Component props.
 * @param props.active - Whether the step is the current step; shows its text and button.
 * @param props.completed - Whether the step is done.
 * @param props.step - Step number.
 * @returns The create account step.
 */
export const CreateTerraAccount = ({
  active,
  completed,
  step,
}: CreateTerraAccountProps): JSX.Element | null => {
  const { config } = useConfig();
  const { exportToTerraUrl } = config;

  const onOpenTerra = (): void => {
    if (exportToTerraUrl) {
      // eslint-disable-next-line baseline-js/use-baseline -- window.open is in every supported browser; Baseline files it under the "window" feature.
      window.open(
        exportToTerraUrl,
        ANCHOR_TARGET.BLANK,
        REL_ATTRIBUTE.NO_OPENER_NO_REFERRER,
      );
    }
  };

  return (
    <FormStep
      action={
        <Button {...BUTTON_PRESETS.PRIMARY_CONTAINED} onClick={onOpenTerra}>
          Go to Terra
        </Button>
      }
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

import { JSX } from "react";
import { BUTTON_PROPS } from "../../../../../../../../styles/common/mui/button";
import { useTerraSetUpUI } from "../../../../../../../../terra/setUpUI/provider/hook";
import { STEPS_REGION_ID } from "../../constants";
import { StyledButton } from "./button.styles";
import { ButtonProps } from "./types";

/**
 * Button that shows or hides the Terra setup steps, labelled "Continue" when
 * they are hidden and "Save & continue later" when they are shown.
 * @param props - Component props.
 * @param props.collapsible - Whether the steps can be shown and hidden; defaults to false.
 * @returns The toggle button, or null when the steps are not collapsible.
 */
export const Button = ({
  collapsible = false,
}: ButtonProps): JSX.Element | null => {
  const { isOpen, onChange } = useTerraSetUpUI();

  if (!collapsible) return null;

  return (
    <StyledButton
      aria-controls={STEPS_REGION_ID}
      aria-expanded={isOpen}
      color={isOpen ? BUTTON_PROPS.COLOR.SECONDARY : BUTTON_PROPS.COLOR.PRIMARY}
      onClick={onChange}
      variant={BUTTON_PROPS.VARIANT.CONTAINED}
    >
      {isOpen ? "Save & continue later" : "Continue"}
    </StyledButton>
  );
};

import { JSX } from "react";
import { BUTTON_PROPS } from "../../../../../../../../styles/common/mui/button";
import { useTerraSetUpUI } from "../../../../../../../../terra/setUpUI/provider/hook";
import { StyledButton } from "./button.styles";
import { ButtonProps } from "./types";

export const Button = ({
  collapsible = false,
}: ButtonProps): JSX.Element | null => {
  const { isOpen, onChange } = useTerraSetUpUI();

  if (!collapsible) return null;

  return (
    <StyledButton
      color={isOpen ? BUTTON_PROPS.COLOR.SECONDARY : BUTTON_PROPS.COLOR.PRIMARY}
      onClick={onChange}
      variant={BUTTON_PROPS.VARIANT.CONTAINED}
    >
      {isOpen ? "Save & continue later" : "Continue"}
    </StyledButton>
  );
};

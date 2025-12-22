import { ArrowDropDownRounded } from "@mui/icons-material";
import { JSX } from "react";
import { BUTTON_PROPS } from "../../constants";
import { StyledButton } from "./dropdownButton.styles";
import { DropdownButtonProps } from "./types";

export const DropdownButton = ({
  children,
  open = false,
  ...props /* Mui ButtonProps */
}: DropdownButtonProps): JSX.Element => {
  return (
    <StyledButton
      {...BUTTON_PROPS.SECONDARY_CONTAINED}
      endIcon={<ArrowDropDownRounded />}
      open={open}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

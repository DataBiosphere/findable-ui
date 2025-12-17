import { SortRounded } from "@mui/icons-material";
import React from "react";
import { BUTTON_PROPS } from "../../../../../../../../../styles/common/mui/button";
import { TEST_IDS } from "../../../../../../../../../tests/testIds";
import { StyledButton } from "./button.styles";
import { ButtonProps } from "./types";

export const Button = ({ onClick, open = false }: ButtonProps): JSX.Element => {
  return (
    <StyledButton
      color={BUTTON_PROPS.COLOR.SECONDARY}
      data-testid={TEST_IDS.FILTER_SORT_BUTTON}
      onClick={onClick}
      open={open}
      startIcon={<SortRounded />}
      variant={BUTTON_PROPS.VARIANT.TEXT}
    >
      Sort
    </StyledButton>
  );
};

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { smokeLightest } from "../../../../../styles/common/mixins/colors";
import { ButtonSecondary } from "../ButtonSecondary/buttonSecondary";

interface Props {
  open: boolean;
}

// Dropdown button with "secondary" styles.
export const DropdownButton = styled(ButtonSecondary, {
  shouldForwardProp: (prop) => prop !== "open",
})<Props>`
  padding-right: 8px;

  .MuiButton-endIcon {
    margin-left: -6px;
  }

  ${({ open, ...props }) =>
    open &&
    css`
      background-color: ${smokeLightest(props)};
    `}
`;

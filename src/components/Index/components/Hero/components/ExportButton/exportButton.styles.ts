import styled from "@emotion/styled";
import { mediaTabletUp } from "../../../../../../styles/common/mixins/breakpoints";
import { ButtonPrimary } from "../../../../../common/Button/components/ButtonPrimary/buttonPrimary";

export const Button = styled(ButtonPrimary)`
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  display: none;
  margin-left: -1px;

  ${mediaTabletUp} {
    display: block;
  }
`;

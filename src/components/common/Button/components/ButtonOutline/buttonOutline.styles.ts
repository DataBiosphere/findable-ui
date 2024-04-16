import styled from "@emotion/styled";
import { white } from "../../../../../styles/common/mixins/colors";
import { alpha32, alpha64 } from "../../../../../theme/common/palette";
import { Button } from "../../button";

export const ButtonOutline = styled(Button)`
  box-shadow: inset 0 0 0 1px ${white}${alpha32};
  color: ${white};

  &:hover {
    box-shadow: inset 0 0 0 1px ${white}${alpha64};
  }

  &:disabled {
    box-shadow: inset 0 0 0 1px ${white}${alpha32};
    color: ${white};
  }
`;

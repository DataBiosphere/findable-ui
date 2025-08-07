import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { FONT } from "../../../../../../../../../styles/common/constants/font";
import { bpDownSm } from "../../../../../../../../../styles/common/mixins/breakpoints";
import { BarX } from "../../../../../../../../Plot/components/BarX/barX";

export const StyledBarX = styled(BarX)`
  font: ${FONT.BODY_SMALL_400};

  svg {
    g.x-axis {
      text {
        &:nth-of-type(1) {
          text-anchor: start;
        }

        &:nth-last-of-type(1) {
          text-anchor: end;
        }

        ${bpDownSm} {
          display: none;
          &:nth-of-type(1),
          &:nth-last-of-type(1) {
            display: block;
          }
        }
      }
    }
  }
`;

export const StyledButton = styled(Button)`
  align-self: flex-start;
  text-transform: none;
`;

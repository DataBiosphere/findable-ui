import styled from "@emotion/styled";
import { textBodySmall400 } from "../../../../../../../../styles/common/mixins/fonts";
import { BarX } from "../../../../../../../Plot/components/BarX/barX";

export const StyledBarX = styled(BarX)`
  ${textBodySmall400};

  svg {
    g.x-axis {
      text:nth-of-type(1) {
        text-anchor: start;
      }
      text:nth-last-of-type(1) {
        text-anchor: end;
      }
    }
  }
`;

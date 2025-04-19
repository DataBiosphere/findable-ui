import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { Outline } from "../../../Layout/components/Outline/outline";

export const StyledOutline = styled(Outline)`
  &.MuiTabs-root {
    .MuiTab-root {
      color: ${PALETTE.INK_LIGHT};

      &.Mui-selected {
        color: ${PALETTE.INK_MAIN};
      }

      &.Mui-disabled {
        color: ${PALETTE.SMOKE_DARK};
        opacity: 1;
      }
    }
  }
`;

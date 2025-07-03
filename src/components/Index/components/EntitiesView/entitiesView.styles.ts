import styled from "@emotion/styled";
import { mediaTabletDown } from "../../../../styles/common/mixins/breakpoints";
import { white } from "../../../../styles/common/mixins/colors";
import { FluidPaper } from "../../../common/Paper/paper.styles";

export const StyledFluidPaper = styled(FluidPaper)`
  &.MuiPaper-root {
    margin: 16px;
    position: relative; /* required; positions table loading indicator */

    .MuiToolbar-root {
      background-color: ${white};
      padding: 20px;

      .MuiToggleButtonGroup-root {
        .MuiToggleButton-root {
          padding: 8px 16px;
          text-transform: none;
        }
      }
    }
  }

  ${mediaTabletDown} {
    &.MuiPaper-root {
      margin: 16px 0;
    }
  }
`;

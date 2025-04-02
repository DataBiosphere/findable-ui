import styled from "@emotion/styled";
import { white } from "../../../../styles/common/mixins/colors";
import { FluidPaper } from "../../../common/Paper/paper.styles";

export const StyledFluidPaper = styled(FluidPaper)`
  &.MuiPaper-root {
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
`;

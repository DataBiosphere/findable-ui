import styled from "@emotion/styled";
import { SvgIcon } from "@mui/material";
import {
  inkLight,
  smokeDark,
} from "../../../../../../../../styles/common/mixins/colors";

export const StyledSvgIcon = styled(SvgIcon)`
  &.MuiSvgIcon-root {
    border-radius: 50%;
    box-sizing: content-box;
    padding: 4px;

    &.Mui-completed {
      border: 2px solid ${smokeDark};
      color: ${inkLight};
    }
  }
`;

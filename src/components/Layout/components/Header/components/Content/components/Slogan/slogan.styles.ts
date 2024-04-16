import styled from "@emotion/styled";
import { Divider as MDivider } from "@mui/material";
import { mediaDesktopSmallUp } from "../../../../../../../../styles/common/mixins/breakpoints";

export const Slogan = styled.div`
  padding: 8px 24px;

  .MuiTypography-text-body-400 {
    display: block;
  }

  ${mediaDesktopSmallUp} {
    flex: none;
    padding: 0;

    .MuiTypography-text-body-400 {
      font-size: 12px;
      line-height: 18px;
      max-width: 180px;
    }
  }
`;

export const Divider = styled(MDivider)`
  max-height: 32px;
`;

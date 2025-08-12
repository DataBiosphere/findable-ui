import styled from "@emotion/styled";
import { Divider as MDivider } from "@mui/material";
import { bpUpMd } from "../../../../../../../../styles/common/mixins/breakpoints";

export const Slogan = styled.div`
  padding: 8px 24px;

  .MuiTypography-body-400 {
    display: block;
  }

  ${bpUpMd} {
    flex: none;
    padding: 0;

    .MuiTypography-body-400 {
      font-size: 12px;
      line-height: 18px;
      max-width: 180px;
    }
  }
`;

export const Divider = styled(MDivider)`
  align-self: center;
  display: flex;
  height: 32px;
`;

import styled from "@emotion/styled";
import { Dialog as MDialog } from "@mui/material";
import { FONT } from "../../../../../../../../../../styles/common/constants/font";
import { inkLight } from "../../../../../../../../../../styles/common/mixins/colors";
import { Button as DXButton } from "../../../../../../../../../common/Button/button";

export const Dialog = styled(MDialog)`
  + .MuiDialog-root {
    .MuiButton-activeNav,
    .MuiButton-nav {
      font: ${FONT.BODY_400};
      padding: 6px 48px;

      &.Mui-disabled {
        color: ${inkLight};
        font: ${FONT.UPPERCASE_500};
        margin-top: 20px;
        opacity: 1;
        text-transform: uppercase;
      }

      &:first-of-type {
        margin-top: 10px;
      }
    }
  }
`;

export const Content = styled.div`
  padding: 16px 0;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Button = styled(DXButton)`
  gap: 8px;
  justify-content: flex-start;
  padding: 12px 24px;
`;

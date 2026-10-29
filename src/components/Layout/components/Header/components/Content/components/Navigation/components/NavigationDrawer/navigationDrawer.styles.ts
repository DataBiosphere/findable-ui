import styled from "@emotion/styled";
import { Button as MButton, Dialog as MDialog } from "@mui/material";
import { FONT } from "../../../../../../../../../../styles/common/constants/font";
import { PALETTE } from "../../../../../../../../../../styles/common/constants/palette";

export const Dialog = styled(MDialog)`
  + .MuiDialog-root {
    .MuiButton-activeNav,
    .MuiButton-nav {
      font: ${FONT.BODY_400};
      padding: 6px 48px;

      &.Mui-disabled {
        color: ${PALETTE.INK_LIGHT};
        font: ${FONT.UPPERCASE_500};
        margin-top: 20px;
        text-transform: uppercase;
        opacity: 1;
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

export const Button = styled(MButton)`
  gap: 8px;
  justify-content: flex-start;
  padding: 12px 24px;
`;

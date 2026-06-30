import styled from "@emotion/styled";
import { Dialog, Typography } from "@mui/material";
import { COLOR_MIXES } from "../../../styles/common/constants/colorMixes";

export const StyledDialog = styled(Dialog)`
  &.MuiDialog-root {
    .MuiBackdrop-root {
      background-color: ${COLOR_MIXES.INK_MAIN_80};
    }

    .MuiDialog-paper {
      border-radius: 8px;
      max-width: 400px;
      padding: 32px 0;
      position: relative; /* positions close icon */

      .MuiDialogTitle-root,
      .MuiDialogContent-root,
      .MuiDialogActions-root {
        padding: 0;
      }

      .MuiDialogTitle-root {
        font-size: 20px;
        padding: 0 32px;

        .MuiIconButton-root {
          position: absolute;
          right: 12px;
          top: 12px;
        }
      }

      .MuiDialogContent-root {
        padding: 0 32px;

        .MuiDialogContentText-root {
          margin: 8px 0;
        }

        .MuiGrid-root {
          margin: 24px 0;
        }
      }

      .MuiDialogActions-root {
        display: flex;
        flex-direction: column;
        gap: 16px 0;
        padding: 0 32px;
      }
    }
  }
`;

export const StyledTypography = styled(Typography)`
  margin-top: 24px;
  padding: 0 32px;
`;

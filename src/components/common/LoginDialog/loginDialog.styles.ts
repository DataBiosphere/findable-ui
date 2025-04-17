import styled from "@emotion/styled";
import { Dialog } from "@mui/material";
import { COLOR_MIXES } from "../../../styles/common/constants/colorMixes";

export const StyledDialog = styled(Dialog)`
  &.MuiDialog-root {
    .MuiBackdrop-root {
      background-color: ${COLOR_MIXES.INK_MAIN_80};
    }

    .MuiDialog-paper {
      border-radius: 8px;
      max-width: 400px;
      padding: 32px;
      position: relative; /* positions close icon */

      .MuiDialogTitle-root,
      .MuiDialogContent-root,
      .MuiDialogActions-root {
        padding: 0;
      }

      .MuiDialogTitle-root {
        font-size: 20px;

        .MuiIconButton-root {
          position: absolute;
          right: 12px;
          top: 12px;
        }
      }

      .MuiDialogContent-root {
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
      }
    }
  }
`;

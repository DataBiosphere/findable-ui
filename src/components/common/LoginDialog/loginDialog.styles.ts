import styled from "@emotion/styled";
import { Dialog } from "@mui/material";
import { inkMain } from "../../../styles/common/mixins/colors";
import { alpha80 } from "../../../theme/common/palette";

export const StyledDialog = styled(Dialog)`
  &.MuiDialog-root {
    .MuiBackdrop-root {
      background-color: ${inkMain}${alpha80};
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

        .MuiGrid2-root {
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

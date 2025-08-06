import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Alert } from "@mui/material";
import { FONT } from "../../../styles/common/constants/font";
import { SIZE } from "../../../styles/common/constants/size";
import { textBodyLarge500 } from "../../../styles/common/mixins/fonts";

export const StyledAlert = styled(Alert)`
  ${(props) =>
    props.size === SIZE.LARGE &&
    css`
      padding: 20px;
      .MuiAlert-icon {
        padding: 2px 0;
      }
      .MuiAlert-message {
        font: ${FONT.BODY_400_2_LINES};
        .MuiAlertTitle-root {
          ${textBodyLarge500(props)};
        }
      }
    `}
`;

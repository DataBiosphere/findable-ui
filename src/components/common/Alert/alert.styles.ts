import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Alert } from "@mui/material";
import { SIZE } from "../../../styles/common/constants/size";
import {
  textBody4002Lines,
  textBodyLarge500,
} from "../../../styles/common/mixins/fonts";

export const StyledAlert = styled(Alert)`
  ${(props) =>
    props.size === SIZE.LARGE &&
    css`
      padding: 20px;
      .MuiAlert-icon {
        padding: 2px 0;
      }
      .MuiAlert-message {
        ${textBody4002Lines(props)};
        .MuiAlertTitle-root {
          ${textBodyLarge500(props)};
        }
      }
    `}
`;

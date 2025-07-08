import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TableRow as MTableRow } from "@mui/material";
import {
  primaryLightest,
  smokeLightest,
} from "../../../../styles/common/mixins/colors";
import { textBodySmall500 } from "../../../../styles/common/mixins/fonts";

export interface StyledTableRowProps {
  isGrouped?: boolean;
  isPreview?: boolean;
}

export const StyledTableRow = styled(MTableRow, {
  shouldForwardProp: (prop) => prop !== "isPreview" && prop !== "isGrouped",
})<StyledTableRowProps>`
  && {
    transition: background-color 300ms ease-in;

    ${(props) =>
      props.isGrouped &&
      css`
        background-color: ${smokeLightest(props)};

        td {
          ${textBodySmall500(props)};
          background-color: inherit;
          grid-column: 1 / -1;
        }
      `}

    ${(props) =>
      props.isPreview &&
      css`
        background-color: ${primaryLightest(props)};
      `}
  }
`;

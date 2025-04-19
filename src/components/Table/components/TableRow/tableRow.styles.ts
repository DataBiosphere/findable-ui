import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TableRow as MTableRow } from "@mui/material";
import { FONT } from "../../../../styles/common/constants/font";
import {
  primaryLightest,
  smokeLightest,
} from "../../../../styles/common/mixins/colors";

interface Props {
  isGrouped?: boolean;
  isPreview?: boolean;
}

export const TableRow = styled(MTableRow, {
  shouldForwardProp: (prop) => prop !== "isPreview" && prop !== "isGrouped",
})<Props>`
  && {
    transition: background-color 300ms ease-in;

    ${(props) =>
      props.isGrouped &&
      css`
        background-color: ${smokeLightest(props)};

        td {
          background-color: inherit;
          font: ${FONT.BODY_SMALL_500};
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

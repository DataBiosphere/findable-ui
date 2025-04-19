import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TableRow as MTableRow } from "@mui/material";
import { FONT } from "../../../../styles/common/constants/font";
import { PALETTE } from "../../../../styles/common/constants/palette";

interface Props {
  isGrouped?: boolean;
  isPreview?: boolean;
}

export const TableRow = styled(MTableRow, {
  shouldForwardProp: (prop) => prop !== "isPreview" && prop !== "isGrouped",
})<Props>`
  && {
    transition: background-color 300ms ease-in;

    ${({ isGrouped }) =>
      isGrouped &&
      css`
        background-color: ${PALETTE.SMOKE_LIGHTEST};

        td {
          background-color: inherit;
          font: ${FONT.BODY_SMALL_500};
          grid-column: 1 / -1;
        }
      `}

    ${({ isPreview }) =>
      isPreview &&
      css`
        background-color: ${PALETTE.PRIMARY_LIGHTEST};
      `}
  }
`;

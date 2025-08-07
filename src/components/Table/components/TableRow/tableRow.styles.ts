import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TableRow as MTableRow } from "@mui/material";
import { FONT } from "../../../../styles/common/constants/font";
import { PALETTE } from "../../../../styles/common/constants/palette";

export interface StyledTableRowProps {
  canExpand?: boolean;
  isExpanded?: boolean;
  isGrouped?: boolean;
  isPreview?: boolean;
}

export const StyledTableRow = styled(MTableRow, {
  shouldForwardProp: (prop) =>
    prop !== "canExpand" &&
    prop !== "isExpanded" &&
    prop !== "isPreview" &&
    prop !== "isGrouped",
})<StyledTableRowProps>`
  && {
    transition: background-color 300ms ease-in;

    ${(props) =>
      props.isGrouped &&
      css`
        background-color: ${PALETTE.SMOKE_LIGHTEST};

        td {
          background-color: inherit;
          font: ${FONT.BODY_SMALL_500};
          grid-column: 1 / -1;
        }
      `}

    ${({ canExpand, isExpanded, isGrouped }) =>
      !isGrouped &&
      canExpand &&
      css`
        cursor: pointer;

        &:hover {
          background-color: #f8fbfd;
        }

        ${isExpanded &&
        css`
          background-color: #f8fbfd;
        `}
      `}

    ${({ isPreview }) =>
      isPreview &&
      css`
        background-color: ${PALETTE.PRIMARY_LIGHTEST};
      `}
  }
`;

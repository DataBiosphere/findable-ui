import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TableRow as MTableRow } from "@mui/material";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { textBodySmall500 } from "../../../../styles/common/mixins/fonts";

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
          ${textBodySmall500(props)};
          background-color: inherit;
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

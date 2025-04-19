import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TableCell as MTableCell } from "@mui/material";
import { FONT } from "../../../../../../styles/common/constants/font";
import { smokeLightest } from "../../../../../../styles/common/mixins/colors";

interface Props {
  isExpanded: boolean;
}

export const TableCell = styled(MTableCell, {
  shouldForwardProp: (prop) => prop !== "isExpanded",
})<Props>`
  && {
    display: block;
    padding: 0;
    transition: background-color 300ms ease-in;
  }

  // Expanded.
  ${({ isExpanded, ...props }) =>
    isExpanded &&
    css`
      && {
        background-color: ${smokeLightest(props)};
      }
    `};
}
`;

export const PinnedCell = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding: 12px 16px;
  word-break: break-word;

  .MuiIconButton-root.Mui-disabled {
    opacity: 0.5;
  }
`;

export const CollapsedContents = styled.div`
  display: grid;
  font: ${FONT.BODY_400_2_LINES};
  gap: 12px;
  justify-items: flex-start;
  padding: 0 16px 12px;
  word-break: break-word;
`;

export const Content = styled.div`
  min-width: 0;
  width: 100%;
`;

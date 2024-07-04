import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TableRow as MTableRow } from "@mui/material";
import { primaryLightest } from "../../../../styles/common/mixins/colors";

interface Props {
  isPreview?: boolean;
}

export const TableRow = styled(MTableRow, {
  shouldForwardProp: (prop) => prop !== "isPreview",
})<Props>`
  && {
    transition: background-color 300ms ease-in;

    ${(props) =>
      props.isPreview &&
      css`
        background-color: ${primaryLightest(props)};
      `}
  }
`;

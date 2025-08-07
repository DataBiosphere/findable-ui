import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { Input } from "../../../common/Input/input";
import { SURFACE_TYPE } from "../surfaces/types";
import { FilterMenuSearchProps } from "./filterMenuSearch";

export const StyledInput = styled(Input, {
  shouldForwardProp: (prop) => prop !== "surfaceType",
})<Pick<FilterMenuSearchProps, "surfaceType">>`
  padding: 0 16px;

  .MuiOutlinedInput-input {
    color: ${PALETTE.INK_LIGHT};
  }

  ${({ surfaceType }) =>
    surfaceType === SURFACE_TYPE.MENU &&
    css`
      margin-top: 16px;
    `}
`;

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { inkLight } from "../../../../styles/common/mixins/colors";
import { Input } from "../../../common/Input/input";
import { SURFACE_TYPE } from "../surfaces/types";
import { FilterMenuSearchProps } from "./filterMenuSearch";

export const StyledInput = styled(Input, {
  shouldForwardProp: (prop) => prop !== "surfaceType",
})<Pick<FilterMenuSearchProps, "surfaceType">>`
  padding: 0 16px;

  .MuiOutlinedInput-input {
    color: ${inkLight};
  }

  ${({ surfaceType }) =>
    surfaceType === SURFACE_TYPE.MENU &&
    css`
      margin-top: 16px;
    `}
`;

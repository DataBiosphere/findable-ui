import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { mediaDesktopSmallUp } from "../../../../styles/common/mixins/breakpoints";
import { Input } from "../../../common/Input/input";

export const FilterMenuSearch = styled(Input)`
  padding: 0 16px;

  .MuiOutlinedInput-input {
    color: ${PALETTE.INK_LIGHT};
  }

  ${mediaDesktopSmallUp} {
    margin-top: 16px;
  }
`;

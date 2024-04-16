import styled from "@emotion/styled";
import { mediaDesktopSmallUp } from "../../../../styles/common/mixins/breakpoints";
import { inkLight } from "../../../../styles/common/mixins/colors";
import { Input } from "../../../common/Input/input";

export const FilterMenuSearch = styled(Input)`
  padding: 0 16px;

  .MuiOutlinedInput-input {
    color: ${inkLight};
  }

  ${mediaDesktopSmallUp} {
    margin-top: 16px;
  }
`;

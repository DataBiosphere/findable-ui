import styled from "@emotion/styled";
import { DropdownMenu } from "../../../../../common/DropdownMenu/dropdownMenu";

export const StyledDropdownMenu = styled(DropdownMenu)`
  .MuiListItemButton-root {
    gap: 8px;

    &.Mui-disabled {
      opacity: 1;
    }
  }
`;

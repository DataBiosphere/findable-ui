import styled from "@emotion/styled";
import { List as MList } from "@mui/material";
import {
  textBody400,
  textBody500,
  textUppercase500,
} from "../../../../styles/common/mixins/fonts";

export const NavBar = styled.div`
  .MuiDivider-root {
    margin: 20px 0;
  }
`;

export const List = styled(MList)`
  display: grid;
  gap: 12px;
  padding: 0;

  .MuiListItem-root {
    margin: 0;
    padding: 0;

    .MuiListItemButton-root {
      flex: 1;
      padding: 0;

      &:hover {
        background-color: transparent;
      }

      .MuiListItemText-root {
        ${textBody400};
      }

      &.Mui-disabled {
        color: ${({ theme }) => theme.palette.ink.light};
        margin-top: 20px;
        opacity: 1;

        .MuiListItemText-root {
          ${textUppercase500};
        }
      }

      &.Mui-selected {
        color: ${({ theme }) => theme.palette.primary.main};

        .MuiListItemText-root {
          ${textBody500};
        }
      }
    }
  }
`;

import styled from "@emotion/styled";
import { List as MList } from "@mui/material";
import { FONT } from "../../../../styles/common/constants/font";
import { PALETTE } from "../../../../styles/common/constants/palette";

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
        font: ${FONT.BODY_400};
      }

      &.Mui-disabled {
        color: ${PALETTE.INK_LIGHT};
        margin-top: 20px;
        opacity: 1;

        .MuiListItemText-root {
          font: ${FONT.UPPERCASE_500};
          text-transform: uppercase;
        }
      }

      &.Mui-selected {
        color: ${PALETTE.PRIMARY_MAIN};

        .MuiListItemText-root {
          font: ${FONT.BODY_500};
        }
      }
    }

    &:first-of-type {
      .MuiListItemButton-root.Mui-disabled {
        margin-top: 0;
      }
    }
  }
`;

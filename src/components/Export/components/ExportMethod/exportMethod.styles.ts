import styled from "@emotion/styled";
import { Card } from "@mui/material";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { sectionPadding } from "../../../common/Section/section.styles";

export const StyledCard = styled(Card)`
  ${sectionPadding};
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr auto;
  position: relative; /* positions card action area */

  .MuiCardActionArea-root {
    inset: 0;
    position: absolute; /* covers entire card */
    text-decoration: none;

    &.Mui-disabled {
      background-color: ${PALETTE.COMMON_WHITE};
      opacity: 0.6;
    }
  }

    .MuiCardContent-root {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 0;
    }

    a {
      position: relative;
      z-index: 1; /* Elevates links above the absolutely positioned CardActionArea overlay. */
    }
  }

  .MuiCardActions-root {
    padding: 0;
  }
` as typeof Card;

import styled from "@emotion/styled";
import { Card } from "@mui/material";
import { sectionPadding } from "../../../common/Section/section.styles";

export const StyledCard = styled(Card)`
  .MuiCardActionArea-root {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr auto;
    ${sectionPadding};
    text-decoration: none;

    &.Mui-disabled {
      opacity: 0.6;
    }

    .MuiCardContent-root {
      padding: 0;

      h3 {
        margin-bottom: 4px;
      }
    }

    .MuiCardActions-root {
      padding: 0;
    }
  }
` as typeof Card;

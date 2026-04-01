import styled from "@emotion/styled";
import { Card } from "@mui/material";
import { sectionPadding } from "../../../common/Section/section.styles";

export const StyledCard = styled(Card)`
  ${sectionPadding};
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr auto;
  position: relative; /* positions card action area */

  .MuiCardActionArea-root {
    height: 100%;
    left: 0;
    position: absolute; /* covers entire card */
    top: 0;
    text-decoration: none;
    width: 100%;

    &.Mui-disabled {
      opacity: 0.6;
    }
  }

  .MuiCardContent-root {
    padding: 0;

    h3 {
      margin-bottom: 4px;
    }

    a {
      position: relative;
      z-index: 1; // Elevates links above the absolutely positioned CardActionArea overlay.
    }
  }

  .MuiCardActions-root {
    padding: 0;
  }
` as typeof Card;

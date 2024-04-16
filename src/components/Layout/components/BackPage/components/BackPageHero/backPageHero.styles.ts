import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { TABLET } from "../../../../../../theme/common/breakpoints";
import { CallToActionButton as CTAButton } from "../../../../../common/Button/components/CallToActionButton/callToActionButton";

export const BackPageHeroHeadline = styled.div`
  display: contents;

  > * {
    grid-column: 1 / -1; // Title and breadcrumbs consume full width of available grid.
  }

  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    display: flex;
    flex: 1;
    gap: 88px;

    > * {
      grid-column: unset;
    }
  }
`;

export const HeroHeader = styled(Stack)`
  flex: 1;
`;

export const CallToActionButton = styled(CTAButton)`
  align-self: center;
  justify-self: flex-start;

  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    justify-self: flex-end;
  }
`;

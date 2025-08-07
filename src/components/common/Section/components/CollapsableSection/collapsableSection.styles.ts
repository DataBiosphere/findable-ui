import styled from "@emotion/styled";
import { ButtonBase, Typography } from "@mui/material";
import { PALETTE } from "../../../../../styles/common/constants/palette";
import { TABLET } from "../../../../../theme/common/breakpoints";

export const CollapsableSection = styled.div`
  background-color: ${PALETTE.COMMON_WHITE};
  display: flex;
  flex-direction: column;
  min-width: 0; /* required to ellipsis any flex child */
  padding: 4px 0;

  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    gap: 8px;
    padding: 20px;
  }
`;

export const SectionSummary = styled(ButtonBase)`
  display: flex;
  justify-content: space-between;
  padding: 16px;

  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    padding: 0;
  }
`;

export const SectionText = styled(Typography)`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px 16px;

  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    padding: 0;
  }
` as typeof Typography;

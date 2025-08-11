import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { PALETTE } from "../../../styles/common/constants/palette";
import { mediaTabletUp } from "../../../styles/common/mixins/breakpoints";
import { ThemeProps } from "../../../theme/types";

export const sectionMargin = css`
  margin: 20px 16px;
`;

export const sectionMarginSm = css`
  margin: 20px;
`;

export const sectionMarginXsm = css`
  margin: 16px;
`;

export const sectionPadding = ({ theme }: ThemeProps) => css`
  padding: 20px 16px;

  ${mediaTabletUp({ theme })} {
    padding: 20px;
  }
`;

export const Section = styled.div`
  ${sectionPadding};
  display: flex;
  flex-direction: column;
  gap: 16px 0;
`;

// Basic section with white background - typically used as a direct descendant of GridPaper component.
export const GridPaperSection = styled(Section)`
  background-color: ${PALETTE.COMMON_WHITE};
`;

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px 0;
`;

export const SectionText = styled(Typography)`
  > p {
    margin: 0 0 8px;
  }

  > *:last-child {
    margin-bottom: 0;
  }
` as typeof Typography;

export const SectionContentListItem = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;

export const SectionActions = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

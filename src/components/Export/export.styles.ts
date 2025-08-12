import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FONT } from "../../styles/common/constants/font";
import { PALETTE } from "../../styles/common/constants/palette";
import { bpUpSm } from "../../styles/common/mixins/breakpoints";
import { ThemeProps } from "../../theme/types";
import { SectionContent as MDXSectionContent } from "../common/MDXMarkdown/components/Section/mdxSection.styles";
import {
  SectionActions as DXSectionActions,
  sectionMarginXsm,
} from "../common/Section/section.styles";

export const sectionMargin = ({ theme }: ThemeProps) => css`
  ${sectionMarginXsm}
  ${bpUpSm({ theme })} {
    margin: 16px 20px;
  }
`;

export const Section = styled.div`
  margin: 20px 0;
`;

export const SectionContent = styled(MDXSectionContent)`
  ${sectionMargin}
`;

export const SectionForm = styled.div`
  min-height: 40px; // Minimum height prevents section from collapsing while form is loading.
`;

export const SectionActions = styled(DXSectionActions)`
  ${sectionMargin}
`;

export const SectionFootnote = styled.div`
  ${sectionMargin}
  color: ${PALETTE.INK_LIGHT};
  font: ${FONT.BODY_SMALL_400_2_LINES};
`;

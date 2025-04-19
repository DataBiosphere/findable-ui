import styled from "@emotion/styled";
import { PALETTE } from "../../styles/common/constants/palette";
import { Section, SectionContent } from "../common/Section/section.styles";

export const StyledSection = styled(Section)`
  align-items: center;
  background-color: ${PALETTE.COMMON_WHITE};
  padding: 40px !important; /* Overrides section padding. */
`;

export const StyledSectionContent = styled(SectionContent)`
  max-width: 456px;
  text-align: center;
`;

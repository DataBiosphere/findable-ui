import styled from "@emotion/styled";
import { white } from "../../styles/common/mixins/colors";
import { Section, SectionContent } from "../common/Section/section.styles";

export const StyledSection = styled(Section)`
  align-items: center;
  background-color: ${white};
  padding: 40px !important; /* Overrides section padding. */
`;

export const StyledSectionContent = styled(SectionContent)`
  max-width: 456px;
  text-align: center;
`;

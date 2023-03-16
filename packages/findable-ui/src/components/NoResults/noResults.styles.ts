import styled from "@emotion/styled";
import { Section, SectionContent } from "../common/Section/section.styles";

export const NoResultsSection = styled(Section)`
  align-items: center;
  padding: 40px !important; /* Overrides section padding. */
`;

export const NoResultsSectionContent = styled(SectionContent)`
  max-width: 456px;
  text-align: center;
`;

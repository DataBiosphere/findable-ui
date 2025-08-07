import styled from "@emotion/styled";
import { FONT } from "../../../../../../styles/common/constants/font";
import { GridPaperSection } from "../../../../../common/Section/section.styles";

export const Title = styled.h3`
  font: ${FONT.HEADING_SMALL};
  margin: 0;
`;

export const Section = styled(GridPaperSection)`
  min-width: 0;
`;

import styled from "@emotion/styled";
import { textHeadingSmall } from "../../../../../../styles/common/mixins/fonts";
import { GridPaperSection } from "../../../../../common/Section/section.styles";

export const Title = styled.h3`
  ${textHeadingSmall};
  margin: 0;
`;

export const Section = styled(GridPaperSection)`
  min-width: 0;
`;

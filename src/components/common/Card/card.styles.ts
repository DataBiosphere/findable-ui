import styled from "@emotion/styled";
import { bpUpSm } from "../../../styles/common/mixins/breakpoints";
import { SectionContent } from "../Section/section.styles";

export const CardSection = styled.div`
  display: grid;
  gap: 16px;
  padding: 20px 16px;

  ${bpUpSm} {
    padding: 20px;
  }
`;

export const CardContent = styled(SectionContent)``;

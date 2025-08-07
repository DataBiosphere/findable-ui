import styled from "@emotion/styled";
import { FONT } from "../../styles/common/constants/font";
import { bpUpSm } from "../../styles/common/mixins/breakpoints";
import { Section, sectionMarginXsm } from "../common/Section/section.styles";

interface Props {
  offset: number;
}

export const ErrorLayout = styled("div", {
  shouldForwardProp: (prop) => prop !== "offset",
})<Props>`
  flex: 1;
  margin-top: ${({ offset }) => offset}px;
`;

export const Error = styled.div`
  margin: 0 auto;
  max-width: 648px;
  padding: 40px 20px;
  width: 100%;

  hr {
    margin: 32px 0;
  }
`;

export const ErrorSection = styled(Section)`
  align-items: center;
  padding: 0;

  ${bpUpSm} {
    padding: 0;
  }
`;

export const SectionContent = styled.div`
  text-align: center;
`;

export const ErrorCode = styled.div`
  ${sectionMarginXsm}
  font: ${FONT.BODY_400_2_LINES};
  font-family: "Roboto Mono", monospace;
  font-size: 12px;
  overflow-wrap: anywhere;
`;

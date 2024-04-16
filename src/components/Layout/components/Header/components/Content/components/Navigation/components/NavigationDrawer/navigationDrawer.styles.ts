import styled from "@emotion/styled";
import { textHeadingSmall } from "../../../../../../../../../../styles/common/mixins/fonts";
import { Button as DXButton } from "../../../../../../../../../common/Button/button";

export const Content = styled.div`
  padding: 16px 0;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Button = styled(DXButton)`
  ${textHeadingSmall};
  gap: 8px;
  justify-content: flex-start;
  padding: 12px 24px;
`;

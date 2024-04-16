import styled from "@emotion/styled";
import { mediaDesktopSmallUp } from "../../../../styles/common/mixins/breakpoints";

export const FilterTags = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 8px;
  padding: 0 16px;

  &:last-child {
    margin-bottom: 0;
  }

  ${mediaDesktopSmallUp} {
    padding: 0;
  }
`;

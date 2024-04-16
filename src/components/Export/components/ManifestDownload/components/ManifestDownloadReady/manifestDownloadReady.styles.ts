import styled from "@emotion/styled";
import { Code as DXCode } from "../../../../../common/Code/code";

export const Code = styled(DXCode)`
  code {
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
`;

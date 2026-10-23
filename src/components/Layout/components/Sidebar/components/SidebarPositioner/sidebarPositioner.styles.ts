import styled from "@emotion/styled";
import { bpUpMd } from "../../../../../../styles/common/mixins/breakpoints";
import { pinned } from "../../../../../../styles/common/mixins/pinned";
import { HEADER_HEIGHT_VAR } from "../../../Header/common/constants";

export const SidebarPositioner = styled("div")`
  box-sizing: border-box;
  height: 100%;
  overflow: visible;
  padding: 16px 0;

  ${bpUpMd} {
    max-height: calc(100vh - ${HEADER_HEIGHT_VAR});
    overflow: auto;
    padding: 0;
    ${pinned(HEADER_HEIGHT_VAR)};
  }
`;

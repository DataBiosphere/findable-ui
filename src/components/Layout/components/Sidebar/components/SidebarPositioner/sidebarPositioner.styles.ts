import styled from "@emotion/styled";
import { bpUpMd } from "../../../../../../styles/common/mixins/breakpoints";
import { pinnedAboveFooter } from "../../../../../../styles/common/mixins/pinnedAboveFooter";
import { HEADER_HEIGHT_VAR } from "../../../Header/common/constants";

export const SidebarPositioner = styled("div")`
  box-sizing: border-box;
  height: 100%;
  overflow: visible;
  padding: 16px 0;

  ${bpUpMd} {
    overflow: auto;
    padding: 0;
    ${pinnedAboveFooter(HEADER_HEIGHT_VAR)};
  }
`;

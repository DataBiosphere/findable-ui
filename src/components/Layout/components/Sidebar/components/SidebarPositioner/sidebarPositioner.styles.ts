import styled from "@emotion/styled";
import { bpUpMd } from "../../../../../../styles/common/mixins/breakpoints";

interface Props {
  headerHeight: number;
}

export const SidebarPositioner = styled("div")<Props>`
  box-sizing: border-box;
  height: 100%;
  overflow: visible;
  padding: 16px 0;

  ${bpUpMd} {
    max-height: 100vh;
    overflow: auto;
    padding: ${({ headerHeight }) => headerHeight}px 0 0;
    position: sticky;
    top: 0;
  }
`;

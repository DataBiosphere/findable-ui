import styled from "@emotion/styled";
import { mediaDesktopSmallUp } from "../../../../../../styles/common/mixins/breakpoints";

interface Props {
  headerHeight: number;
}

export const SidebarPositioner = styled("div")<Props>`
  height: 100%;
  overflow: visible;
  padding: 16px 0;

  ${mediaDesktopSmallUp} {
    height: ${({ headerHeight }) => `calc(100vh - ${headerHeight}px)`};
    overflow: auto;
    padding: ${({ headerHeight }) => headerHeight}px 0 0;
    position: sticky;
    top: 0;
  }
`;

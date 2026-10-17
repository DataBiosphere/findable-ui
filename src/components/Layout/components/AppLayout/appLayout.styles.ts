import styled from "@emotion/styled";
import { SELECTOR } from "../../../../common/selectors";

export const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;

  &:has(> main > * > #${SELECTOR.SIDEBAR_POSITIONER}) {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    grid-template-rows: 1fr auto;
    height: auto;

    > main {
      display: contents;
    }

    > main > :has(> #${SELECTOR.SIDEBAR_POSITIONER}) {
      grid-column: 1;
      grid-row: 1 / -1;
    }
  }
`;

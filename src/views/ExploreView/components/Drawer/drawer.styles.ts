import styled from "@emotion/styled";
import { Drawer } from "@mui/material";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { MODE } from "../../mode/types";
import { css } from "@emotion/react";
import { ComponentProps } from "react";
import { DRAWER_PROPS } from "../../../../styles/common/mui/drawer";

const WIDTH = {
  [MODE.RESEARCH]: "412px",
  [MODE.SEARCH]: "264px",
} as const;

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "mode",
})<ComponentProps<typeof Drawer> & { mode: MODE }>`
  height: 100%;
  transition: width 0.3s ease-in-out;

  .MuiPaper-root {
    width: inherit;
  }

  ${({ mode, open, variant }) =>
    variant === DRAWER_PROPS.VARIANT.TEMPORARY
      ? css`
          width: 312px;

          .MuiPaper-root {
            overflow: visible; // required; allows backdrop button to render outside of drawer container.
          }
        `
      : css`
          width: ${open ? WIDTH[mode] : "0px"};
          z-index: 0;

          .MuiPaper-root {
            background-color: inherit;
            border-right: 1px solid ${PALETTE.SMOKE_MAIN};
            position: relative;
          }
        `}
`;

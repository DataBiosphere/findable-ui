import styled from "@emotion/styled";
import { IconButton as MIconButton } from "@mui/material";
import { PALETTE } from "../../../styles/common/constants/palette";

export const Socials = styled.div`
  display: flex;
`;

export const IconButton = styled(MIconButton)`
  color: ${PALETTE.INK_LIGHT};

  &:hover {
    background-color: ${PALETTE.SMOKE_LIGHT};
  }
` as typeof MIconButton;

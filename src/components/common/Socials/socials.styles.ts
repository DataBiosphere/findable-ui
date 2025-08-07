import styled from "@emotion/styled";
import { IconButton as MIconButton } from "@mui/material";
import { PALETTE } from "../../../styles/common/constants/palette";
import { smokeLight } from "../../../styles/common/mixins/colors";

export const Socials = styled.div`
  display: flex;
`;

export const IconButton = styled(MIconButton)`
  color: ${PALETTE.INK_LIGHT};

  &:hover {
    background-color: ${smokeLight};
  }
` as typeof MIconButton;

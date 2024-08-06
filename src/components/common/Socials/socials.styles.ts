import styled from "@emotion/styled";
import { IconButton as MIconButton } from "@mui/material";
import { inkLight, smokeLight } from "../../../styles/common/mixins/colors";

export const Socials = styled.div`
  display: flex;
`;

export const IconButton = styled(MIconButton)`
  color: ${inkLight};

  &:hover {
    background-color: ${smokeLight};
  }
` as typeof MIconButton;

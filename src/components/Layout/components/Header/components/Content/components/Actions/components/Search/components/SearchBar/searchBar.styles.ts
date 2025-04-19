import styled from "@emotion/styled";
import { Dialog, Input } from "@mui/material";
import { PALETTE } from "../../../../../../../../../../../../styles/common/constants/palette";
import { IconButton } from "../../../../../../../../../../../common/IconButton/iconButton";

interface Props {
  yOffset: number;
}

export const SearchBar = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== "yOffset",
})<Props>`
  .MuiDialog-container {
    width: 100%;

    .MuiDialog-paper {
      margin-top: ${(props) => props.yOffset}px;
    }
  }
`;

export const SearchForm = styled.form`
  align-items: center;
  display: flex;
  gap: 16px;
  margin: 0;
  padding: 12px 16px;
`;

export const SearchInput = styled(Input)`
  border-bottom: 1px solid ${PALETTE.SMOKE_MAIN};
  height: 40px;
  padding: 0;

  &&.Mui-focused ::placeholder {
    color: ${PALETTE.INK_LIGHT};
    opacity: 1;
  }
`;

export const ClearButton = styled(IconButton)`
  color: ${PALETTE.INK_LIGHT};
` as typeof IconButton;

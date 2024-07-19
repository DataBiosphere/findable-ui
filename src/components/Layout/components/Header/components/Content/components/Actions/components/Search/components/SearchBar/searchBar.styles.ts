import styled from "@emotion/styled";
import { Dialog, Input } from "@mui/material";
import {
  inkLight,
  smokeMain,
} from "../../../../../../../../../../../../styles/common/mixins/colors";
import { IconButton } from "../../../../../../../../../../../common/IconButton/iconButton";
import { HEADER_HEIGHT } from "../../../../../../../../common/constants";

export const SearchBar = styled(Dialog)`
  .MuiDialog-container {
    width: 100%;

    .MuiDialog-paper {
      margin-top: ${HEADER_HEIGHT}px;
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
  border-bottom: 1px solid ${smokeMain};
  height: 40px;
  padding: 0;

  &&.Mui-focused ::placeholder {
    color: ${inkLight};
    opacity: 1;
  }
`;

export const ClearButton = styled(IconButton)`
  color: ${inkLight};
` as typeof IconButton;

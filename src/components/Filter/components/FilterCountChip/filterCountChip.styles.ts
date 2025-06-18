import { Chip, styled } from "@mui/material";

export const StyledChip = styled(Chip)`
  align-items: center;
  border-radius: 10px;
  flex: none;
  gap: 0;
  height: 16px;
  justify-content: center;
  min-width: 16px;
  padding: 0 4px;

  .MuiChip-label {
    font-size: 9px;
    font-weight: 600;
    line-height: 16px;
    padding: 0;
  }
`;

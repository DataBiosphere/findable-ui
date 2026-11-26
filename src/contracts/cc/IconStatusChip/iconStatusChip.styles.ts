import styled from "@emotion/styled";
import { StyledChip as StatusChip } from "../StatusChip/statusChip.styles";

// Builds on StatusChip's chip, so the colours, ring, height and label are the same; adds only the icon. The icon is
// 12px whatever size it's given, 4px from the left edge, and 4px from the label (whose 8px padding it overlaps by 4px).
export const StyledChip = styled(StatusChip)`
  .MuiChip-icon {
    font-size: 12px;
    height: 12px;
    margin: 0 -4px 0 4px;
    width: 12px;
  }
`;

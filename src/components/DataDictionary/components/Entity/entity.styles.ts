import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { bpDownSm } from "../../../../styles/common/mixins/breakpoints";

export const StyledTypography = styled(Typography)`
  &:hover a {
    opacity: 1;
  }

  ${bpDownSm} {
    margin: 0 16px;
  }
` as typeof Typography;

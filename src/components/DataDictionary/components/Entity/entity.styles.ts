import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { mediaTabletDown } from "../../../../styles/common/mixins/breakpoints";

export const StyledTypography = styled(Typography)`
  &:hover a {
    opacity: 1;
  }

  ${mediaTabletDown} {
    margin: 0 16px;
  }
` as typeof Typography;

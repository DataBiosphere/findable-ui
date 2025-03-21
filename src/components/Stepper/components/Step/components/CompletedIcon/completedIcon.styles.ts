import styled from "@emotion/styled";
import { SvgIcon } from "@mui/material";
import {
  inkLight,
  smokeDark,
} from "../../../../../../styles/common/mixins/colors";
import { svgIcon } from "../../stepIcon.styles";

export const StyledSvgIcon = styled(SvgIcon)`
  ${svgIcon}
  border: 2px solid ${smokeDark};
  color: ${inkLight};
`;

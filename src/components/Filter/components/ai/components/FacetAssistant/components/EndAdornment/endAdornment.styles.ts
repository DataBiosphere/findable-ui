import styled from "@emotion/styled";
import { ArrowUpwardRounded } from "@mui/icons-material";
import { PALETTE } from "../../../../../../../../styles/common/constants/palette";
import { LoadingIcon } from "../../../../../../../common/CustomIcon/components/LoadingIcon/loadingIcon";

export const StyledLoadingIcon = styled(LoadingIcon)`
  && {
    color: ${PALETTE.PRIMARY_MAIN};

    .Mui-focused & {
      color: ${PALETTE.PRIMARY_MAIN};
    }
  }
`;

export const StyledArrowUpwardRounded = styled(ArrowUpwardRounded)`
  && {
    color: ${PALETTE.INK_LIGHT};

    .Mui-focused & {
      color: ${PALETTE.INK_LIGHT};
    }
  }
`;

import styled from "@emotion/styled";
import {
  inkLight,
  inkMain,
  smokeDark,
} from "../../../../styles/common/mixins/colors";
import { Outline } from "../../../Layout/components/Outline/outline";

export const StyledOutline = styled(Outline)`
  &.MuiTabs-root {
    .MuiTab-root {
      color: ${inkLight};

      &.Mui-selected {
        color: ${inkMain};
      }

      &.Mui-disabled {
        color: ${smokeDark};
        opacity: 1;
      }
    }
  }
`;

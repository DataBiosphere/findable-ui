import styled from "@emotion/styled";
import { mediaTabletDown } from "../../../../styles/common/mixins/breakpoints";
import {
  inkLight,
  inkMain,
  smokeDark,
} from "../../../../styles/common/mixins/colors";
import { Outline } from "../../../Layout/components/Outline/outline";

export const StyledOutline = styled(Outline)`
  &.MuiTabs-root {
    position: sticky;

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

    ${mediaTabletDown} {
      display: none;
    }
  }
`;

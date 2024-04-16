import styled from "@emotion/styled";
import { mediaDesktopUp } from "../../../../../styles/common/mixins/breakpoints";
import { BannerPrimary } from "../BannerPrimary/bannerPrimary";

export const Banner = styled(BannerPrimary)`
  gap: 12px;
  padding: 8px 12px;

  ${mediaDesktopUp} {
    padding: 8px 16px;
  }

  .MuiAlert-message {
    align-self: center;
    flex: 1;
  }

  .MuiAlert-action {
    margin: -8px;
    padding: 0;
  }
`;

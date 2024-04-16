import styled from "@emotion/styled";
import { mediaTabletUp } from "../../../../../styles/common/mixins/breakpoints";
import { white } from "../../../../../styles/common/mixins/colors";
import { textBody400 } from "../../../../../styles/common/mixins/fonts";
import { shadows02 } from "../../../../../styles/common/mixins/shadows";
import { Banner } from "../../banner";

export const CookieBanner = styled(Banner)`
  bottom: 0;
  box-shadow: ${shadows02};
  color: ${white};
  flex-direction: column;
  gap: 16px;
  left: 0;
  margin: 8px;
  padding: 16px;
  position: fixed;
  width: calc(100vw - 16px);
  z-index: 1100; // Above support fab, below support form.

  .MuiAlert-message {
    ${textBody400};

    .MuiLink-root {
      color: inherit;
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }

  .MuiAlert-action {
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
  }

  ${mediaTabletUp} {
    box-sizing: content-box;
    margin: 16px;
    max-width: 400px;
    width: unset;
  }
`;

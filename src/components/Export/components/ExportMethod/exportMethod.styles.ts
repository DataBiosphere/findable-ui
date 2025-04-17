import styled from "@emotion/styled";
import { inkLight } from "../../../../styles/common/mixins/colors";
import { textBodySmall4002Lines } from "../../../../styles/common/mixins/fonts";
import { ButtonPrimary } from "../../../common/Button/components/ButtonPrimary/buttonPrimary";

export const ExportButton = styled(ButtonPrimary)`
  text-transform: none; // overrides MuiButton theme text-transform "capitalize".
`;

export const SectionFootnote = styled.div`
  ${textBodySmall4002Lines}
  color: ${inkLight};
`;

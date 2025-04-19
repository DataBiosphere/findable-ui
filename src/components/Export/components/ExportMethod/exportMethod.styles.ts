import styled from "@emotion/styled";
import { FONT } from "../../../../styles/common/constants/font";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { ButtonPrimary } from "../../../common/Button/components/ButtonPrimary/buttonPrimary";

export const ExportButton = styled(ButtonPrimary)`
  text-transform: none; // overrides MuiButton theme text-transform "capitalize".
`;

export const SectionFootnote = styled.div`
  color: ${PALETTE.INK_LIGHT};
  font: ${FONT.BODY_SMALL_400_2_LINES};
`;

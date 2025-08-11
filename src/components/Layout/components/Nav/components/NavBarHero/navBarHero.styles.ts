import styled from "@emotion/styled";
import { PALETTE } from "../../../../../../styles/common/constants/palette";

export const NavBarHero = styled.div`
  display: grid;
  gap: 8px 0;
  grid-auto-flow: row;
  justify-items: flex-start;
`;

export const HeroLogo = styled.span`
  line-height: 0;

  img {
    display: inline-block;
    margin: 0;
    width: auto;
  }
`;

export const HeroText = styled.span`
  color: ${PALETTE.INK_LIGHT};
  display: block;
  font-size: 12px;
  line-height: 18px;
`;

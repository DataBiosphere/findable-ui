import { Divider } from "@mui/material";
import { JSX } from "react";
import {
  StaticImage,
  StaticImageProps,
} from "../../../../../common/StaticImage/staticImage";
import {
  NavBarHero as Hero,
  HeroText,
  HeroLogo as Logo,
} from "./navBarHero.styles";

export interface NavBarHeroProps {
  byline?: string;
  logo?: StaticImageProps;
  slogan?: string;
}

export const NavBarHero = ({
  byline,
  logo,
  slogan,
}: NavBarHeroProps): JSX.Element => {
  const showHero = byline || logo || slogan;
  return (
    <>
      {showHero && (
        <>
          <Hero>
            {logo && (
              <Logo>
                <StaticImage {...logo} />
              </Logo>
            )}
            {slogan && <HeroText>{slogan}</HeroText>}
            {byline && <HeroText>{byline}</HeroText>}
          </Hero>
          <Divider />
        </>
      )}
    </>
  );
};

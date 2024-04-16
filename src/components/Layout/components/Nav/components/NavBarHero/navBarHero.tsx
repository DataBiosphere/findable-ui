import { Divider } from "@mui/material";
import React from "react";
import {
  StaticImage,
  StaticImageProps,
} from "../../../../../common/StaticImage/staticImage";
import {
  HeroLogo as Logo,
  HeroText,
  NavBarHero as Hero,
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

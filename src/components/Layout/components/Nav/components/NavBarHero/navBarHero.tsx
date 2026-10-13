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

/**
 * Props for the NavBarHero component.
 */
export interface NavBarHeroProps {
  byline?: string;
  logo?: StaticImageProps;
  slogan?: string;
}

/**
 * Nav bar hero, rendering the logo, slogan and byline, when given, above a divider.
 * @param props - Component props.
 * @param props.byline - Byline text.
 * @param props.logo - Logo image.
 * @param props.slogan - Slogan text.
 * @returns The nav bar hero, or nothing when there is no logo, slogan or byline.
 */
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

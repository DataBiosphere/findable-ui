import React, { ReactNode } from "react";
import { HeroLayout } from "./hero.styles";

/**
 * ExploreView page hero component comprising summary counts, and export button.
 */

export interface HeroProps {
  SideBarButton?: ReactNode;
}

export const Hero = ({ SideBarButton }: HeroProps): JSX.Element => {
  return <>{SideBarButton && <HeroLayout>{SideBarButton}</HeroLayout>}</>;
};

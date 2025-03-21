import React, { ReactNode } from "react";
import { useLayoutDimensions } from "../../providers/layoutDimensions/hook";
import { HeroTitle } from "../common/Title/title";
import { Hero } from "./components/Hero/hero";
import { Index as IndexLayout } from "./index.styles";

export interface IndexProps {
  className?: string;
  List?: ReactNode;
  ListHero?: ReactNode | ReactNode[];
  SideBarButton?: ReactNode;
  SubTitleHero?: ReactNode | ReactNode[];
  Summaries?: ReactNode;
  Tabs?: ReactNode;
  title: HeroTitle;
}

export const Index = ({
  className,
  List,
  ListHero,
  SideBarButton,
  SubTitleHero,
  Summaries,
  Tabs,
  title,
}: IndexProps): JSX.Element => {
  const { dimensions } = useLayoutDimensions();
  return (
    <IndexLayout className={className} marginTop={dimensions.header.height}>
      <Hero SideBarButton={SideBarButton} Summaries={Summaries} title={title} />
      {SubTitleHero}
      {Tabs}
      {ListHero}
      {List}
    </IndexLayout>
  );
};

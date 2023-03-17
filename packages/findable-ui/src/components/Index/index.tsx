import React, { ReactNode } from "react";
import { HeroTitle } from "../common/Title/title";
import { Hero } from "./components/Hero/hero";
import { Index as IndexLayout } from "./index.styles";

export interface IndexProps {
  entities?: ReactNode;
  Summaries?: ReactNode;
  Tabs?: ReactNode;
  title: HeroTitle;
}

export const Index = ({
  entities,
  Summaries,
  Tabs,
  title,
}: IndexProps): JSX.Element => {
  return (
    <IndexLayout>
      <Hero Summaries={Summaries} title={title} />
      {Tabs}
      {entities}
    </IndexLayout>
  );
};

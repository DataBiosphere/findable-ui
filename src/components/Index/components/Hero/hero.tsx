import React, { ReactNode } from "react";
import { HeroTitle, Title } from "../../../common/Title/title";
import { ExportButton } from "./components/ExportButton/exportButton";
import { HeroLayout, SummaryWidget, Widgets } from "./hero.styles";

/**
 * ExploreView page hero component comprising title, summary counts, and export button.
 */

export interface HeroProps {
  SideBarButton?: ReactNode;
  Summaries?: ReactNode;
  title: HeroTitle;
}

export const Hero = ({
  SideBarButton,
  Summaries,
  title,
}: HeroProps): JSX.Element => {
  return (
    <>
      {(title || SideBarButton || Summaries) && (
        <HeroLayout>
          <Title title={title} />
          {SideBarButton}
          {Summaries && (
            <Widgets>
              <SummaryWidget buttonWidget={true}>
                {/* TODO +n link widget, and accompanying Dot separator */}
                {Summaries}
              </SummaryWidget>
              <ExportButton />
            </Widgets>
          )}
        </HeroLayout>
      )}
    </>
  );
};

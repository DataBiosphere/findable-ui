import React, { ReactNode } from "react";
import { ExportButton } from "./components/ExportButton/exportButton";
import { HeroLayout, SummaryWidget, Widgets } from "./hero.styles";

/**
 * ExploreView page hero component comprising summary counts, and export button.
 */

export interface HeroProps {
  SideBarButton?: ReactNode;
  Summaries?: ReactNode;
}

export const Hero = ({ SideBarButton, Summaries }: HeroProps): JSX.Element => {
  return (
    <>
      {(SideBarButton || Summaries) && (
        <HeroLayout>
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

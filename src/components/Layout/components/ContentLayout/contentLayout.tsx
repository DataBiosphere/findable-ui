import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { useLayoutState } from "../../../../hooks/useLayoutState";
import { LayoutStyle } from "./common/entities";
import {
  Content,
  ContentGrid,
  ContentLayout as Layout,
  Navigation as NavigationPositioner,
  NavigationGrid,
  Outline as OutlinePositioner,
  OutlineGrid,
} from "./contentLayout.styles";

export interface ContentLayoutProps {
  className?: string;
  content: ReactNode;
  layoutStyle?: LayoutStyle;
  navigation?: ReactNode;
  outline?: ReactNode;
}

export const ContentLayout = ({
  className,
  content,
  layoutStyle,
  navigation,
  outline,
}: ContentLayoutProps): JSX.Element => {
  const { asPath } = useRouter();
  const {
    layoutState: { headerHeight },
  } = useLayoutState();
  return (
    <Layout className={className} panelColor={layoutStyle?.content}>
      {navigation && (
        <NavigationGrid
          headerHeight={headerHeight}
          panelColor={layoutStyle?.navigation}
        >
          <NavigationPositioner>{navigation}</NavigationPositioner>
        </NavigationGrid>
      )}
      <ContentGrid
        headerHeight={headerHeight}
        panelColor={layoutStyle?.content}
      >
        <Content>{content}</Content>
      </ContentGrid>
      {outline && (
        <OutlineGrid
          key={getOutlineKey(asPath)}
          headerHeight={headerHeight}
          panelColor={layoutStyle?.outline}
        >
          <OutlinePositioner>{outline}</OutlinePositioner>
        </OutlineGrid>
      )}
    </Layout>
  );
};

/**
 * Returns outline key.
 * Facilitates re-rendering of outline when path changes, prevents stale active outline tab on navigation.
 * @param asPath - Current path.
 * @returns key for outline.
 */
function getOutlineKey(asPath: string): string {
  return asPath.split("#")[0] || "";
}

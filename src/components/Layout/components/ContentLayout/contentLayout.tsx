import { useRouter } from "next/router";
import { JSX, ReactNode } from "react";
import { BaseComponentProps } from "../../../types";
import { LayoutStyle } from "./common/entities";
import {
  Content,
  ContentGrid,
  ContentLayout as Layout,
  Navigation,
  NavigationGrid,
  Outline,
  OutlineGrid,
  Positioner,
} from "./contentLayout.styles";

export interface ContentLayoutProps {
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
}: BaseComponentProps & ContentLayoutProps): JSX.Element => {
  const { asPath } = useRouter();
  return (
    <Layout
      className={className}
      hasNavigation={Boolean(navigation)}
      panelColor={layoutStyle?.content}
    >
      {navigation && (
        <NavigationGrid panelColor={layoutStyle?.navigation}>
          <Positioner>
            <Navigation>{navigation}</Navigation>
          </Positioner>
        </NavigationGrid>
      )}
      <ContentGrid panelColor={layoutStyle?.content}>
        <Content>{content}</Content>
      </ContentGrid>
      {outline && (
        <OutlineGrid
          key={getOutlineKey(asPath)}
          panelColor={layoutStyle?.outline}
        >
          <Positioner>
            <Outline>{outline}</Outline>
          </Positioner>
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

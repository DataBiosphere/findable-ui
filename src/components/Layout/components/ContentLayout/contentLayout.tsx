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

/**
 * Props for the ContentLayout component.
 */
export interface ContentLayoutProps {
  content: ReactNode;
  layoutStyle?: LayoutStyle;
  navigation?: ReactNode;
  outline?: ReactNode;
}

/**
 * Content page layout, rendering the content between optional navigation and outline panels.
 * The navigation and outline panels pin below the sticky header, and the outline remounts when the path (excluding the hash) changes.
 * @param props - Component props.
 * @param props.className - Class name applied to the layout.
 * @param props.content - Page content.
 * @param props.layoutStyle - Panel background colors for the content, navigation and outline panels.
 * @param props.navigation - Navigation, rendered in its own panel when truthy.
 * @param props.outline - Outline, rendered in its own panel when truthy.
 * @returns The content layout.
 */
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

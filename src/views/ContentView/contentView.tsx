import { JSX, ReactNode } from "react";
import { LayoutStyle } from "../../components/Layout/components/ContentLayout/common/entities";
import { ContentLayout } from "../../components/Layout/components/ContentLayout/contentLayout";
import { BaseComponentProps } from "../../components/types";

/**
 * Props for the ContentView component.
 */
export interface ContentViewProps {
  content: ReactNode;
  layoutStyle?: LayoutStyle;
  navigation?: ReactNode;
  outline?: ReactNode;
}

/**
 * Renders a content page in the content layout, with optional navigation and outline panels.
 * @param props - Component props.
 * @param props.className - Class name applied to the layout.
 * @param props.content - Main page content.
 * @param props.layoutStyle - Background colors for the content, navigation and outline panels.
 * @param props.navigation - Navigation panel content.
 * @param props.outline - Outline panel content.
 * @returns The content view.
 */
export const ContentView = ({
  className,
  content,
  layoutStyle,
  navigation,
  outline,
}: BaseComponentProps & ContentViewProps): JSX.Element => {
  return (
    <ContentLayout
      className={className}
      content={content}
      layoutStyle={layoutStyle}
      navigation={navigation}
      outline={outline}
    />
  );
};

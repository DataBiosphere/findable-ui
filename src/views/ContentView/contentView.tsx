import React, { ReactNode } from "react";
import { LayoutStyle } from "../../components/Layout/components/ContentLayout/common/entities";
import { ContentLayout } from "../../components/Layout/components/ContentLayout/contentLayout";
import { BaseComponentProps } from "../../components/types";

export interface ContentViewProps {
  content: ReactNode;
  layoutStyle?: LayoutStyle;
  navigation?: ReactNode;
  outline?: ReactNode;
}

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

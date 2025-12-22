import { JSX } from "react";
import { Layout, LayoutScroller } from "./outlineLayout.styles";
import { OutlineLayoutProps } from "./types";

export const OutlineLayout = ({
  children,
  ...props
}: OutlineLayoutProps): JSX.Element => {
  return (
    <Layout {...props}>
      <LayoutScroller>{children}</LayoutScroller>
    </Layout>
  );
};

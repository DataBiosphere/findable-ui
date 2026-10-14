import { JSX } from "react";
import { Layout, LayoutScroller } from "./outlineLayout.styles";
import { OutlineLayoutProps } from "./types";

/**
 * Scrollable layout for the data dictionary outline, sticky below the header and title and clear of the footer; hidden at narrow widths.
 * @param props - Component props, the layout spacing plus children.
 * @param props.children - Outline content.
 * @returns The outline layout.
 */
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

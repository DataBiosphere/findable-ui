import { JSX } from "react";
import { Layout } from "./titleLayout.styles";
import { TitleLayoutProps } from "./types";

/**
 * Layout for the data dictionary title, sticky below the header; at narrow widths it is not sticky.
 * @param props - Component props, the layout spacing plus children.
 * @param props.children - Title content.
 * @returns The title layout.
 */
export const TitleLayout = ({
  children,
  ...props
}: TitleLayoutProps): JSX.Element => {
  return <Layout {...props}>{children}</Layout>;
};

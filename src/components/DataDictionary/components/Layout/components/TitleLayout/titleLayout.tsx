import { JSX } from "react";
import { Layout } from "./titleLayout.styles";
import { TitleLayoutProps } from "./types";

export const TitleLayout = ({
  children,
  ...props
}: TitleLayoutProps): JSX.Element => {
  return <Layout {...props}>{children}</Layout>;
};

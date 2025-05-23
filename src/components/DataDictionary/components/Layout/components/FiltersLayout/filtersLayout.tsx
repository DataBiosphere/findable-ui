import React from "react";
import { Layout } from "./filtersLayout.styles";
import { FiltersLayoutProps } from "./types";

export const FiltersLayout = ({
  children,
  ...props
}: FiltersLayoutProps): JSX.Element => {
  return <Layout {...props}>{children}</Layout>;
};

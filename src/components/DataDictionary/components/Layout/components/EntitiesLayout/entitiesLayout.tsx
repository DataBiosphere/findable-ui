import React from "react";
import { Layout } from "./entitiesLayout.styles";
import { EntitiesLayoutProps } from "./types";

export const EntitiesLayout = ({
  children,
  ...props
}: EntitiesLayoutProps): JSX.Element => {
  return <Layout {...props}>{children}</Layout>;
};

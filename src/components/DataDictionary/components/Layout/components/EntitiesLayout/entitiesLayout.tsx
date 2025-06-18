import React, { forwardRef } from "react";
import { Layout } from "./entitiesLayout.styles";
import { EntitiesLayoutProps } from "./types";

export const EntitiesLayout = forwardRef<HTMLDivElement, EntitiesLayoutProps>(
  function EntitiesLayout(
    { children, spacing, ...props }: EntitiesLayoutProps,
    ref
  ): JSX.Element {
    return (
      <Layout ref={ref} {...spacing} {...props}>
        {children}
      </Layout>
    );
  }
);

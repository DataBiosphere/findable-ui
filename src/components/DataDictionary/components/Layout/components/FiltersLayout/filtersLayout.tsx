import { JSX, forwardRef } from "react";
import { Layout } from "./filtersLayout.styles";
import { FiltersLayoutProps } from "./types";

export const FiltersLayout = forwardRef<HTMLDivElement, FiltersLayoutProps>(
  function FiltersLayout(
    { children, ...props }: FiltersLayoutProps,
    ref,
  ): JSX.Element {
    return (
      <Layout ref={ref} {...props}>
        {children}
      </Layout>
    );
  },
);

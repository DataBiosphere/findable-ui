import { JSX, forwardRef } from "react";
import { Layout } from "./filtersLayout.styles";
import { FiltersLayoutProps } from "./types";

/**
 * Layout for the data dictionary filters, sticky below the header and title; at narrow widths it is not sticky.
 * @param props - Component props.
 * @param props.children - Filters content.
 * @param ref - Ref forwarded to the layout element.
 * @returns The filters layout.
 */
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

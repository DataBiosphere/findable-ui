import { JSX, forwardRef } from "react";
import { Layout } from "./entitiesLayout.styles";
import { EntitiesLayoutProps } from "./types";

/**
 * Layout for the data dictionary entities, in the grid row below the sticky filters.
 * @param props - Component props.
 * @param props.children - Entities content.
 * @param ref - Ref forwarded to the layout element.
 * @returns The entities layout.
 */
export const EntitiesLayout = forwardRef<HTMLDivElement, EntitiesLayoutProps>(
  function EntitiesLayout(
    { children, ...props }: EntitiesLayoutProps,
    ref,
  ): JSX.Element {
    return (
      <Layout ref={ref} {...props}>
        {children}
      </Layout>
    );
  },
);

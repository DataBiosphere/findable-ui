import { JSX, forwardRef } from "react";
import { Layout } from "./entitiesLayout.styles";
import { EntitiesLayoutProps } from "./types";

/**
 * Layout for the data dictionary entities, padded at the top to sit below the header and the sticky filters.
 * @param props - Component props.
 * @param props.children - Entities content.
 * @param props.spacing - Layout spacing.
 * @param ref - Ref forwarded to the layout element.
 * @returns The entities layout.
 */
export const EntitiesLayout = forwardRef<HTMLDivElement, EntitiesLayoutProps>(
  function EntitiesLayout(
    { children, spacing, ...props }: EntitiesLayoutProps,
    ref,
  ): JSX.Element {
    return (
      <Layout ref={ref} {...spacing} {...props}>
        {children}
      </Layout>
    );
  },
);

import { JSX, ElementType } from "react";
import { v4 as uuid4 } from "uuid";

/**
 * Renders a React functional or class component as a React node.
 */

export interface RenderComponentProps {
  Component: ElementType;
}

export const RenderComponent = ({
  Component,
  ...props
}: RenderComponentProps): JSX.Element => {
  return <Component key={uuid4} {...props} />;
};

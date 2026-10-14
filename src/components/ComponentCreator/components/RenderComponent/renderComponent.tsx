import { ElementType, JSX } from "react";
import { v4 as uuid4 } from "uuid";

/**
 * Props for the RenderComponent component.
 */
export interface RenderComponentProps {
  Component: ElementType;
}

/**
 * Renders a React functional or class component as a React node.
 * @param props - Component props, passed through to the component.
 * @param props.Component - Component to render.
 * @returns The rendered component.
 */
export const RenderComponent = ({
  Component,
  ...props
}: RenderComponentProps): JSX.Element => {
  return <Component key={uuid4} {...props} />;
};

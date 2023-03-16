import React, { ElementType } from "react";
import { v4 as uuid4 } from "uuid";

/**
 * Renders a React functional or class component as a React node.
 */

export interface RenderComponentProps {
  Component: ElementType;
}

export const RenderComponent = ({
  Component,
}: RenderComponentProps): JSX.Element => {
  return <Component key={uuid4} />;
};

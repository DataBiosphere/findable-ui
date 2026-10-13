import { Fragment, JSX } from "react";
import { ComponentsConfig } from "../../../../config/entities";
import { ComponentCreator } from "../../../ComponentCreator/ComponentCreator";

/**
 * Props for the Floating component.
 */
export interface FloatingProps {
  components?: ComponentsConfig;
}

/**
 * Renders the configured floating components.
 * @param props - Component props.
 * @param props.components - Floating components config.
 * @returns The floating components, or nothing when none are configured.
 */
export const Floating = ({ components }: FloatingProps): JSX.Element => {
  return (
    <Fragment>
      {components && <ComponentCreator components={components} response={{}} />}
    </Fragment>
  );
};

import React, { Fragment } from "react";
import { ComponentsConfig } from "../../../../config/entities";
import { ComponentCreator } from "../../../ComponentCreator/ComponentCreator";

export interface FloatingProps {
  components?: ComponentsConfig;
}

export const Floating = ({ components }: FloatingProps): JSX.Element => {
  return (
    <Fragment>
      {components && <ComponentCreator components={components} response={{}} />}
    </Fragment>
  );
};

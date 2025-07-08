import React, { Fragment } from "react";
import { useConfig } from "../../../../../../../hooks/useConfig";

export const ActionButton = (): JSX.Element | null => {
  const { entityConfig } = useConfig();
  const { ui } = entityConfig;
  const { actionButton } = ui || {};

  if (!actionButton) return null;

  return <Fragment>{actionButton}</Fragment>;
};

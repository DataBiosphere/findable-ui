import { Fragment, JSX } from "react";
import { useConfig } from "../../../../../../../hooks/useConfig";

/**
 * Entity list action button, as configured on the entity's UI config.
 * @returns The configured action button, or null when none is configured.
 */
export const ActionButton = (): JSX.Element | null => {
  const { entityConfig } = useConfig();
  const { ui } = entityConfig;
  const { actionButton } = ui || {};

  if (!actionButton) return null;

  return <Fragment>{actionButton}</Fragment>;
};

import { JSX } from "react";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { ComponentCreator } from "../../../../../../ComponentCreator/ComponentCreator";

/**
 * Entity list slot, rendering the components configured for it on the entity's UI config.
 * @returns The slot's components, or null when none are configured.
 */
export const EntityListSlot = (): JSX.Element | null => {
  const { entityConfig } = useConfig();
  const { ui } = entityConfig;
  const { slots } = ui || {};
  const { entityListSlot } = slots || {};

  if (!entityListSlot) return null;

  return <ComponentCreator components={entityListSlot} response={undefined} />;
};

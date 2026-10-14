import { JSX } from "react";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { ComponentCreator } from "../../../../../../ComponentCreator/ComponentCreator";
import { StyledGrid } from "./entityViewSlot.styles";

/**
 * Entity view slot, rendering the components configured for it on the entity's UI config in a grid.
 * @returns The slot's components, or null when none are configured.
 */
export const EntityViewSlot = (): JSX.Element | null => {
  const { entityConfig } = useConfig();
  const { ui } = entityConfig;
  const { slots } = ui || {};
  const { entityViewSlot } = slots || {};

  if (!entityViewSlot) return null;

  return (
    <StyledGrid>
      <ComponentCreator components={entityViewSlot} response={undefined} />
    </StyledGrid>
  );
};

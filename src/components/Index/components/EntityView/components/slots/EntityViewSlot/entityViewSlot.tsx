import React from "react";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { ComponentCreator } from "../../../../../../ComponentCreator/ComponentCreator";
import { StyledGrid } from "./entityViewSlot.styles";

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

import React from "react";
import { useConfig } from "../../../../../../hooks/useConfig";
import { ComponentCreator } from "../../../../../ComponentCreator/ComponentCreator";
import { StyledGrid } from "./listHero.styles";

export const ListHero = (): JSX.Element | null => {
  const { entityConfig } = useConfig();
  const { listView } = entityConfig;
  const { listHero } = listView || {};

  if (!listHero) return null;

  return (
    <StyledGrid>
      <ComponentCreator components={listHero} response={undefined} />
    </StyledGrid>
  );
};

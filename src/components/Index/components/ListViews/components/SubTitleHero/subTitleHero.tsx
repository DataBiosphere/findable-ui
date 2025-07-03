import React from "react";
import { useConfig } from "../../../../../../hooks/useConfig";
import { ComponentCreator } from "../../../../../ComponentCreator/ComponentCreator";
import { StyledGrid } from "./subTitleHero.styles";

export const SubTitleHero = (): JSX.Element | null => {
  const { entityConfig } = useConfig();
  const { listView } = entityConfig;
  const { subTitleHero } = listView || {};

  if (!subTitleHero) return null;

  return (
    <StyledGrid>
      <ComponentCreator components={subTitleHero} response={undefined} />
    </StyledGrid>
  );
};

import React from "react";
import { useConfig } from "../../../../hooks/useConfig";
import { Title as CommonTitle } from "../../../common/Title/title";
import { BaseComponentProps } from "../../../types";
import { StyledGrid } from "./title.styles";

export const Title = ({
  className,
}: BaseComponentProps): JSX.Element | null => {
  const { entityConfig } = useConfig();
  const { listView } = entityConfig;
  const { title } = listView || {};

  if (!title) return null;

  return (
    <StyledGrid>
      <CommonTitle className={className}>{title}</CommonTitle>
    </StyledGrid>
  );
};

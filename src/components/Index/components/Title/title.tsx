import React from "react";
import { useConfig } from "../../../../hooks/useConfig";
import { Title as CommonTitle } from "../../../common/Title/title";

export const Title = (): JSX.Element | null => {
  const { entityConfig } = useConfig();
  const { listView } = entityConfig;
  const { title } = listView || {};

  if (!title) return null;

  return <CommonTitle>{title}</CommonTitle>;
};

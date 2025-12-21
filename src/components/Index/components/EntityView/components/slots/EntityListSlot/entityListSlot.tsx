import { JSX } from "react";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { ComponentCreator } from "../../../../../../ComponentCreator/ComponentCreator";

export const EntityListSlot = (): JSX.Element | null => {
  const { entityConfig } = useConfig();
  const { ui } = entityConfig;
  const { slots } = ui || {};
  const { entityListSlot } = slots || {};

  if (!entityListSlot) return null;

  return <ComponentCreator components={entityListSlot} response={undefined} />;
};

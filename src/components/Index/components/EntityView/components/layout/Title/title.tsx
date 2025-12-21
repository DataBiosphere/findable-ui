import { JSX } from "react";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { Title as CommonTitle } from "../../../../../../common/Title/title";
import { BaseComponentProps } from "../../../../../../types";

export const Title = ({
  className,
}: BaseComponentProps): JSX.Element | null => {
  const { entityConfig } = useConfig();
  const { ui } = entityConfig;
  const { title } = ui || {};

  if (!title) return null;

  return <CommonTitle className={className}>{title}</CommonTitle>;
};

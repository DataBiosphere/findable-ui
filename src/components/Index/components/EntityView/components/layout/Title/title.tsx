import { JSX } from "react";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { Title as CommonTitle } from "../../../../../../common/Title/title";
import { BaseComponentProps } from "../../../../../../types";

/**
 * Entity list title, as configured on the entity's UI config.
 * @param props - Component props.
 * @param props.className - Class name applied to the title.
 * @returns The title, or null when no title is configured.
 */
export const Title = ({
  className,
}: BaseComponentProps): JSX.Element | null => {
  const { entityConfig } = useConfig();
  const { ui } = entityConfig;
  const { title } = ui || {};

  if (!title) return null;

  return <CommonTitle className={className}>{title}</CommonTitle>;
};

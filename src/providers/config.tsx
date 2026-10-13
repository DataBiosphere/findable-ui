import { createContext, JSX, ReactNode, useState } from "react";
import { annotateSiteConfig } from "../components/DataDictionary/common/utils";
import { EntityConfig, SiteConfig } from "../config/entities";
import {
  getDefaultConfig,
  getDefaultEntityConfig,
  getEntityConfig,
} from "../config/utils";

export type ConfigContextProps = {
  config: SiteConfig;
  defaultEntityListType: string;
  entityConfig: EntityConfig;
  entityListType: string;
};

/**
 * Props for the ConfigProvider component.
 */
export interface ConfigProps {
  children: ReactNode | ReactNode[];
  config: SiteConfig;
  entityListType?: string;
}

export const ConfigContext = createContext<ConfigContextProps>({
  config: getDefaultConfig(),
  defaultEntityListType: "",
  entityConfig: getDefaultEntityConfig(),
  entityListType: "",
});

/**
 * Provides the site config and the config for the current entity through ConfigContext.
 * Annotates the site config in place, once, on first render; a different config passed on a later render is not annotated.
 * @param props - Component props.
 * @param props.children - Children.
 * @param props.config - Site config.
 * @param props.entityListType - Current entity list type; when empty, the entity config is resolved from the site's default route.
 * @returns The config provider.
 * @throws If no entity config matches the entity list type.
 */
export function ConfigProvider({
  children,
  config,
  entityListType = "",
}: ConfigProps): JSX.Element {
  // Annote config on init. Note config is mutated but using state here to
  // ensure annotated config is calculated once and is used rather than the raw config.
  const [annotatedConfig] = useState(() => {
    annotateSiteConfig(config);
    return config;
  });

  const { entities } = annotatedConfig;
  const defaultEntityListType = config.redirectRootToPath.slice(1);
  const entityName = entityListType || defaultEntityListType;
  const entityConfig = getEntityConfig(entities, entityName);
  return (
    <ConfigContext.Provider
      value={{
        config,
        defaultEntityListType,
        entityConfig,
        entityListType,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

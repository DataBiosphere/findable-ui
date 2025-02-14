import React, { createContext, ReactNode, useState } from "react";
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

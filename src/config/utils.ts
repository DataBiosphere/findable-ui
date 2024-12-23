import { EXPLORE_MODE } from "../hooks/useExploreMode";
import { getConfig } from "./config";
import { EntityConfig, SiteConfig } from "./entities";

/**
 * Returns context default config for config provider.
 * @returns context default config for config provider.
 */
export function getDefaultConfig(): SiteConfig {
  return {
    appTitle: "",
    browserURL: "",
    dataSource: {
      url: "",
    },
    entities: [],
    explorerTitle: "",
    layout: {
      footer: {
        Branding: null,
        navLinks: [],
        socials: [],
      },
      header: {
        logo: null,
      },
    },
    redirectRootToPath: "",
  };
}

/**
 * Returns context default entity config for config provider.
 * @returns context default entity config for config provider.
 */
export function getDefaultEntityConfig(): EntityConfig {
  return {
    detail: {
      detailOverviews: [],
      staticLoad: false,
      tabs: [],
      top: [],
    },
    exploreMode: EXPLORE_MODE.CS_FETCH_CS_FILTERING,
    label: "",
    list: {
      columns: [],
    },
    route: "",
  };
}

/**
 * Returns the entity config for the given entity list type.
 * @param entities - Entities config.
 * @param entityListType - Entity list type.
 * @returns the entity config for the given entity list type.
 */
export function getEntityConfig(
  entities: EntityConfig[],
  entityListType: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
): EntityConfig {
  if (!entityListType) return getDefaultEntityConfig();
  const entityConfig = entities.find(({ route }) => route === entityListType);
  if (!entityConfig) {
    throw Error("No entity config found with name: " + entityListType);
  }
  return entityConfig;
}

/**
 * Returns the config for the given entity.
 * @param path - the path used to identify the entity.
 * @returns - the entity config associated with the given route path.
 */
export const getEntityConfigFromConfig = (
  path: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
): EntityConfig<any> => {
  const entityConfig = getConfig().entities.find(
    (entity) => entity.route === path
  );

  if (!entityConfig) {
    throw Error("No entity found with name: " + path);
  }

  return entityConfig;
};

import { ColumnSort } from "@tanstack/react-table";
import { getConfig } from "./config";
import { EntityConfig, SiteConfig } from "./entities";

/**
 * Returns context default config for config provider.
 * @returns context default config for config provider.
 */
export function getDefaultConfig(): SiteConfig {
  return {
    browserURL: "",
    dataSource: {
      url: "",
    },
    entities: [],
    explorerTitle: "",
    layout: {
      footer: {
        logos: [],
        navLinks: [],
        socials: [],
      },
      header: {
        logo: {
          alt: "",
          link: "",
          src: undefined,
        },
        navLinks: [],
        socials: [],
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
    label: "",
    list: {
      columns: [],
    },
    route: "",
    staticLoad: false,
  };
}

/**
 * Returns the initial table sorting state for the specified entity list configuration.
 * @param entityConfig - Entity configuration.
 * @returns initial sorting state.
 */
export function getDefaultSorting(entityConfig: EntityConfig): ColumnSort[] {
  const columnSort = entityConfig.list.defaultSort;
  if (!columnSort) {
    return [];
  }
  return [columnSort];
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

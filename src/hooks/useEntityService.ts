import { EntityConfig, EntityMapper } from "../config/entities";
import { getEntityConfig } from "../config/utils";
import { createEntityService } from "../entity/service/factory";
import { ENTITY_SERVICE_TYPE, EntityService } from "../entity/service/model";
import { useCatalog } from "./useCatalog";
import { useConfig } from "./useConfig";
import { EXPLORE_MODE } from "./useExploreMode";
import { useExploreState } from "./useExploreState";

interface FetcherResponse<T, I> extends EntityService {
  catalog: string | undefined;
  detailStaticLoad: boolean;
  entityMapper?: EntityMapper<T, I>;
  path: string;
}

export const getEntityService = <T, I>(
  entityConfig: EntityConfig,
  catalog: string | undefined
): FetcherResponse<T, I> => {
  if (entityConfig.apiPath) {
    // Server-side fetch and filtering.
    if (entityConfig.exploreMode === EXPLORE_MODE.SS_FETCH_SS_FILTERING) {
      return {
        ...createEntityService(ENTITY_SERVICE_TYPE.API),
        catalog,
        detailStaticLoad: entityConfig.detail.staticLoad,
        entityMapper: entityConfig.entityMapper,
        path: entityConfig.apiPath,
      };
    }
    // Server-side fetch, client-side filtering.
    if (entityConfig.exploreMode === EXPLORE_MODE.SS_FETCH_CS_FILTERING) {
      return {
        ...createEntityService(ENTITY_SERVICE_TYPE.API_CF),
        catalog,
        detailStaticLoad: entityConfig.detail.staticLoad,
        entityMapper: entityConfig.entityMapper,
        path: entityConfig.apiPath,
      };
    }
  }
  // Client-side API and filtering.
  if (entityConfig.exploreMode === EXPLORE_MODE.CS_FETCH_CS_FILTERING) {
    return {
      ...createEntityService(ENTITY_SERVICE_TYPE.TSV),
      catalog: undefined,
      detailStaticLoad: true,
      entityMapper: entityConfig.entityMapper,
      path: entityConfig.route, //the entity list type
    };
  }
  throw Error(
    `There's no data path for the entity ${entityConfig.label}. Define a tsvPath or an apiPath`
  );
};

/**
 * Hook to determine how the data should be loaded.
 * From API or from a TSV file.
 * @param entityListType - Entity list type (optional).
 * @returns @see FetcherResponse
 */
export const useEntityService = <T, I>(
  entityListType?: string
): FetcherResponse<T, I> => {
  const { config } = useConfig();
  const catalog = useCatalog();
  const { exploreState } = useExploreState();
  const entityConfig = getEntityConfig(
    config.entities,
    entityListType || exploreState.tabValue // if entity list type is undefined, use the current state's tab value.
  );
  return getEntityService(entityConfig, catalog);
};

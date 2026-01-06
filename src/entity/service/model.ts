import {
  AzulEntitiesResponse,
  AzulListParams,
  AzulSummaryResponse,
} from "../../apis/azul/common/entities";
import { DataSourceConfig, EntityMapper } from "../../config/entities";
import { FilterState } from "../../hooks/useCategoryFilter";

/**
 * Object that has all necessary functions to fetch data to fill listing and detail pages
 * for each entity
 */
export interface EntityService {
  fetchAllEntities: (
    apiPath: string,
    accessToken: string | undefined,
    catalog?: string,
    listParams?: AzulListParams,
  ) => Promise<AzulEntitiesResponse>;

  fetchEntitiesFromQuery: (
    apiPath: string,
    listParams: AzulListParams,
    catalog: string | undefined,
    accessToken: string | undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This type can't be known before hand
  ) => Promise<AzulEntitiesResponse>;

  fetchEntitiesFromURL: (
    url: string,
    accessToken: string | undefined,
  ) => Promise<AzulEntitiesResponse>;

  fetchEntity?: <T, I>(
    id: string,
    apiPath: string,
    entityMapper?: EntityMapper<T, I>,
  ) => Promise<T>;

  fetchEntityDetail: (
    id: string,
    apiPath: string,
    catalog: string | undefined,
    accessToken: string | undefined,
    defaultParams:
      | DataSourceConfig["defaultDetailParams"]
      | DataSourceConfig["defaultParams"]
      | undefined,
    swallow404?: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This type can't be known before hand
  ) => Promise<any>;

  fetchSummary: (
    filterState: FilterState,
    catalog: string | undefined,
    accessToken: string | undefined,
  ) => Promise<AzulSummaryResponse>;
}

/**
 * Set of possible fetchers.
 */
export enum ENTITY_SERVICE_TYPE {
  API = "API",
  API_CF = "API_CF",
  TSV = "TSV",
}

/**
 * Entity service type.
 */
export type EntityServiceType = ENTITY_SERVICE_TYPE;

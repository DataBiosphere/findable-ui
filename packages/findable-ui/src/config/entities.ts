import { ThemeOptions } from "@mui/material";
import { ColumnSort } from "@tanstack/react-table";
import { JSXElementConstructor } from "react";
import { CategoryKey, SelectedFilterValue } from "../common/entities";
import { HeroTitle } from "../components/common/Title/title";
import { FooterProps } from "../components/Layout/components/Footer/footer";
import { HeaderProps } from "../components/Layout/components/Header/header";
import { ExploreState } from "../providers/exploreState";

/**
 * Interface to define the authentication configuration for a given site.
 */
export interface AuthenticationConfig {
  googleGISAuthConfig?: GoogleGISAuthConfig;
  loginNotice?: LoginNotice;
  text?: string;
  title: string;
}

/**
 * Interface to define the set of components that will be used for the back page.
 */
export interface BackPageConfig {
  detailOverviews: TabConfig["label"][];
  staticLoad: boolean;
  tabs: BackPageTabConfig[];
  top: ComponentsConfig;
}

/**
 * Interface to determine the components for each tab on the back page
 */
export interface BackPageTabConfig extends TabConfig {
  mainColumn: ComponentsConfig;
  sideColumn?: ComponentsConfig;
}

/**
 * Model of category configured in site config.
 */
export interface CategoryConfig {
  key: string;
  label: string;
}

/**
 * Column configuration.
 */
export interface ColumnConfig<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
  T = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
  C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = any
> {
  columnVisible?: boolean; // Column is visible. Default is "true".
  componentConfig: ComponentConfig<C, T>;
  disableHiding?: boolean; // Disables hiding of column. Column is unavailable for "Edit Columns" functionality when "true".
  disableSorting?: boolean; // Disables sorting for the column.
  header: string;
  id: string; // The unique identifier for the column.
  tooltip?: string; // TODO review need to define `tooltip` field - it is currently not in use.
  width: GridTrackSize;
}

/**
 * Interface used to define the configuration of a component.
 * This will be used by @see ComponentCreator to create a React component with the given props and
 * making any necessary transformations.
 */
export interface ComponentConfig<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
  D = any
> {
  children?: ComponentConfig[];
  component: React.FC<React.ComponentProps<T>>;
  props?: React.ComponentProps<T>;
  viewBuilder?: (
    model: D,
    viewContext?: ViewContext
  ) => React.ComponentProps<T>;
}

/**
 * Type to determine the array of components that will be created on using @see ComponentCreator.
 * This can be an array of @see ComponentConfig or a function that returns an array of @see ComponentConfig
 */
export type ComponentsConfig =
  | ComponentConfig[]
  | ((config: SiteConfig) => ComponentConfig[]);

/**
 * Interface to determine the API URL and version.
 */
export interface DataSourceConfig {
  defaultDetailParams?: {
    [key: string]: string;
  };
  defaultListParams?: {
    [key: string]: string;
  };
  url: string;
}

/**
 * Interface used to define the entities and router that will be used on the application, alongside with
 * the detail and the list page configuration.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
export interface EntityConfig<D = any, I = any> extends TabConfig {
  apiPath?: string;
  detail: BackPageConfig;
  getId?: GetIdFunction<D>;
  list: ListConfig;
  listView?: ListViewConfig;
  options?: Options;
  staticEntityImportMapper?: EntityImportMapper<I, D>;
  staticLoad: boolean;
  staticLoadFile?: string;
}

/**
 * Entity import mapper function.
 */
type EntityImportMapper<I, D> = (input: I) => D;

/**
 * Get identifier function.
 */
type GetIdFunction<T> = (detail: T) => string;

/**
 * Google GIS authentication configuration.
 */
export interface GoogleGISAuthConfig {
  clientId: string;
  googleProfileEndpoint: string;
  scope: string;
  terraProfileEndpoint: string; // TODO move this to its own interface
}

/**
 * Grid track configuration.
 */
export type GridTrackAuto = "auto"; // Dimension specifying the track's maximum of the largest max-content size of the items in that track.
export type GridTrackFlex = `${number}fr`; // Dimension specifying the track's flex factor; unit in "fr".
export type GridTrackLength = `${number}px`; // Dimension specifying the track's (fixed) width; unit in "px".

/**
 * A min and max dimension specifying a size range greater than or equal to min and less than or equal to max.
 * As a maximum, a GridTrackFlex value sets the track's flex factor and is invalid as a minimum.
 */
export interface GridTrackMinMax {
  max: GridTrackAuto | GridTrackFlex | GridTrackLength;
  min: GridTrackAuto | GridTrackLength;
}

/**
 * A selection of possible types of track sizing values of each track (column).
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns#values.
 */
export type GridTrackSize =
  | GridTrackAuto
  | GridTrackLength
  | GridTrackFlex
  | GridTrackMinMax;

/**
 * List configuration.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model can receive any model as type
export interface ListConfig<T = any> {
  columns: ColumnConfig<T>[];
  defaultSort?: ColumnSort; // Establishes initial table state "sorting" state.
}

/**
 * List view configuration.
 */
export interface ListViewConfig {
  disablePagination?: boolean;
  relatedView?: RelatedViewConfig;
}

/**
 * Interface to define the authentication login notice component.
 */
export interface LoginNotice {
  conditionsUrl: string;
  privacyUrl: string;
}

/**
 * Option Method.
 */
export type OptionMethod = "GET" | "POST";

/**
 * API options.
 */
export interface Options {
  method: OptionMethod;
}

/**
 * Related search function.
 */
type RelatedSearchFunction = (
  searchKey: CategoryKey | undefined,
  resultKey: CategoryKey | undefined,
  selectedCategoryValues: SelectedFilterValue | undefined
) => Promise<RelatedSearchResult | undefined>;

/**
 * Product of the related search function.
 */
export interface RelatedSearchResult {
  resultKey: CategoryKey; // The related search function resultant search values' category key.
  searchKey: CategoryKey; // The related search function search parameters' category key.
  values: string[]; // Resultant search values.
}

/**
 * Related view configuration.
 */
export interface RelatedViewConfig {
  relatedSearchFn: RelatedSearchFunction;
  resultKey: CategoryKey; // The related search function resultant search values' category key.
  searchKey: CategoryKey; // The related search function search parameters' category key.
}

/**
 * Interface that will hold the whole configuration for a given site.
 */
export interface SiteConfig {
  authentication?: AuthenticationConfig;
  browserURL: string;
  categoryConfigs?: CategoryConfig[];
  dataSource: DataSourceConfig;
  entities: EntityConfig[];
  explorerTitle: HeroTitle;
  export?: BackPageConfig;
  exportToTerraUrl?: string; // TODO(cc) revist location; possibly nest inside "export"?
  layout: {
    footer: FooterProps;
    header: HeaderProps;
  };
  redirectRootToPath: string;
  summaryConfig?: SummaryConfig;
  themeOptions?: ThemeOptions;
}

/**
 * Sort direction.
 */
export const SORT_DIRECTION = {
  ASCENDING: false,
  DESCENDING: true,
};

/**
 * Interface to determine the summary components and endpoint placed above the entities list.
 */
export interface SummaryConfig {
  apiPath: string;
  components: ComponentsConfig;
}

/**
 * Interface used to define the tab label and route.
 */
interface TabConfig {
  label: string;
  route: string;
}

/**
 * View context.
 */
export interface ViewContext {
  entityConfig: EntityConfig;
  exploreState: ExploreState;
}

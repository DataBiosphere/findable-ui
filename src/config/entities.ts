import { TabProps as MTabProps, Theme, ThemeOptions } from "@mui/material";
import {
  CellContext,
  ColumnDef,
  ColumnMeta,
  ColumnSort,
  GroupingState,
  RowData,
  Table,
  TableOptions,
} from "@tanstack/react-table";
import { JSX, JSXElementConstructor, ReactNode } from "react";
import { AzulSummaryResponse } from "../apis/azul/common/entities";
import { CategoryConfig } from "../common/categories/config/types";
import {
  DataDictionaryAnnotation,
  DataDictionaryConfig,
  SelectedFilter,
} from "../common/entities";
import { FilterSortConfig } from "../common/filters/sort/config/types";
import { FooterProps } from "../components/Layout/components/Footer/footer";
import { HeaderProps } from "../components/Layout/components/Header/header";
import { ExploreMode } from "../hooks/useExploreMode/types";
import { AuthState } from "../providers/authentication/auth/types";
import { UserProfile } from "../providers/authentication/authentication/types";
import { ProviderId } from "../providers/authentication/common/types";
import { ExploreState } from "../providers/exploreState";
import { FileManifestState } from "../providers/fileManifestState";
import { SystemStatus, SystemStatusResponse } from "../providers/systemStatus";

/**
 * Interface to define the analytics configuration for a given site.
 */
export interface AnalyticsConfig {
  gtmAuth: string; // Required for GTM env configurations (e.g. staging vs Live)
  gtmId: string;
  gtmPreview: string; // Required for GTM env configurations (e.g. staging vs Live)
}

/**
 * Interface to define the authentication configuration for a given site.
 */
export interface AuthenticationConfig {
  providers?: OAuthProvider[];
  services?: AuthService[];
  termsOfService?: ReactNode;
  text?: ReactNode;
  title: string;
  warning?: ReactNode;
}

export interface AuthService {
  endpoint: Record<string, string>;
  id: string;
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
 * Model of category group config in site config.
 */
export interface CategoryGroupConfig {
  categoryGroups: CategoryGroup[];
  key: string;
  savedFilters?: SavedFilter[];
}

/**
 * Model of grouped configured categories in site config.
 */
export interface CategoryGroup {
  categoryConfigs: CategoryConfig[];
  label?: string;
}

/**
 * Column configuration.
 * TanStack ColumnDef properties not currently supported include:
 * - `enableMultiSort` - Note, table multi-sort is managed via table options.
 */
export type ColumnConfig<
  T extends RowData,
  TValue = unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
  C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = any,
> = Omit<ColumnDef<T, TValue>, "enableMultiSort"> & {
  // @deprecated - Use `meta.columnPinned` instead.
  columnPinned?: boolean; // Column is pinned to the top when table rows are collapsable.
  componentConfig: ComponentConfig<C, T>;
  header: string;
  id: string; // The unique identifier for the column.
  meta?: ColumnMeta<T, unknown>;
  // @deprecated - Use `meta.width` instead.
  width: GridTrackSize;
};

/**
 * Interface used to define the configuration of a component.
 * This will be used by @see ComponentCreator to create a React component with the given props and
 * making any necessary transformations.
 */
export interface ComponentConfig<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
  D = any,
> {
  children?: ComponentConfig[];
  component: React.FC<React.ComponentProps<T>>;
  props?: React.ComponentProps<T>;
  viewBuilder?: (
    model: D,
    viewContext?: ViewContext<D>,
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
  defaultParams?: {
    catalog: string;
  };
  url: string;
}

/**
 * Path for the entity
 */
export type EntityPath = string;

/**
 * Interface used to define the entities and router that will be used on the application, alongside with
 * the detail and the list page configuration.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
export interface EntityConfig<T = any, I = any> extends TabConfig {
  annotation?: DataDictionaryAnnotation;
  apiPath?: EntityPath;
  categoryGroupConfig?: CategoryGroupConfig;
  detail: BackPageConfig;
  entityMapper?: EntityMapper<T, I>;
  exploreMode: ExploreMode;
  export?: ExportConfig;
  getId?: GetIdFunction<T>;
  getTitle?: GetTitleFunction<T>;
  hideTabs?: boolean;
  key?: string; // Optional data dictionary key
  list: ListConfig<T>;
  listView?: ListViewConfig;
  options?: Options;
  overrides?: Override[];
  staticLoadFile?: string;
  table?: EntityTableOptions<T>;
  ui?: EntityUIConfig;
}

/**
 * Entity mapper function.
 */
export type EntityMapper<T, I> = (input: I) => T;

export type EntityTableOptions<T = unknown> = Omit<
  TableOptions<T>,
  "data" | "getCoreRowModel"
>;

export interface EntityUIConfig {
  actionButton?: ReactNode; // Action button.
  enableExportButton?: boolean; // Flag to show/hide the export button.
  enableSummary?: boolean; // Flag to show/hide the summary.
  enableTabs?: boolean; // Flag to show/hide the tabs.
  slots?: {
    entityListSlot?: ComponentsConfig; // Slot above the entity list.
    entityViewSlot?: ComponentsConfig; // Slot above the entity view (e.g. top of the page).
  };
  title?: ReactNode; // Title component (optional).
}

/**
 * Interface to define the export configuration for a given site.
 */
export interface ExportConfig extends Omit<BackPageConfig, "detailOverviews"> {
  exportMethods: ExportMethodConfig[];
}

/**
 * Export method configuration.
 */
export interface ExportMethodConfig {
  mainColumn: ComponentsConfig;
  route: string;
  top: ComponentsConfig;
}

/**
 * Floating configuration - for support and other floating components e.g. banners.
 */
export interface FloatingConfig {
  components: ComponentsConfig;
}

/**
 * Get identifier function.
 */
export type GetIdFunction<T> = (detail: T) => string;

/**
 * Get title function.
 */
export type GetTitleFunction<T> = (detail?: T) => string | undefined;

/**
 * Grid track configuration.
 */
export type GridTrackAuto = "auto"; // Dimension specifying the track's maximum of the largest max-content size of the items in that track.
export type GridTrackFlex = `${number}fr`; // Dimension specifying the track's flex factor; unit in "fr".
export type GridTrackLength = `${number}px`; // Dimension specifying the track's (fixed) width; unit in "px".
export type GridTrackMaxContent = "max-content"; // Dimension specifying the track's size by the largest maximal content of the grid items in that track.
export type GridTrackMinContent = "min-content"; // Dimension specifying the track's size by the largest minimal content of the grid items in that track.

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
  | GridTrackMaxContent
  | GridTrackMinContent
  | GridTrackMinMax;

/**
 * List configuration.
 */
export interface ListConfig<T extends RowData> {
  columns: ColumnConfig<T>[];
  tableOptions?: Omit<TableOptions<T>, "columns" | "data" | "getCoreRowModel">; // Additional TanStack Table's options.
}

/**
 * List view configuration.
 */
export interface ListViewConfig {
  disablePagination?: boolean;
  rowPreviewView?: ComponentsConfig; // Row preview view is expected to be a modal or drawer or similar.
  rowSelectionView?: ComponentsConfig;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Use of `any` is intentional to allow for flexibility in the model.
export interface OAuthProvider<P = any> {
  authorization: { params: { scope: string } };
  clientId: string;
  icon: ReactNode;
  id: ProviderId;
  name: string;
  profile: (profile: P) => UserProfile;
  userinfo: string;
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
 * Override.
 */
export interface Override {
  deprecated?: boolean;
  duplicateOf?: string;
  entryId: string;
  redirectUrl?: string;
  supersededBy?: string;
  withdrawn?: boolean;
}

export interface SavedFilter {
  filters: SelectedFilter[];
  grouping?: GroupingState;
  sorting?: ColumnSort[];
  title: string;
}
/**
 * Filter applied tracking payload
 */
export interface TrackFilterAppliedPayload {
  category: string;
  fromSearchAll: boolean;
  searchTerm: string;
  section: string;
  selected: boolean;
  value: unknown;
}

/**
 * Filter applied tracking function
 */
export type TrackFilterAppliedFunction = (
  payload: TrackFilterAppliedPayload,
) => void;

/**
 * Filter opened tracking payload
 */
export interface TrackFilterOpenedPayload {
  category: string;
}

/**
 * Filter opened tracking function
 */
export type TrackFilterOpenedFunction = (
  payload: TrackFilterOpenedPayload,
) => void;

interface TrackingConfig {
  trackFilterApplied?: TrackFilterAppliedFunction;
  trackFilterOpened?: TrackFilterOpenedFunction;
}

/**
 * Interface that will hold the whole configuration for a given site.
 */
export interface SiteConfig {
  analytics?: AnalyticsConfig;
  appTitle: string;
  authentication?: AuthenticationConfig;
  browserURL: string;
  categoryGroupConfig?: CategoryGroupConfig;
  contentDir?: string;
  contentThemeOptionsFn?: ThemeOptionsFn;
  dataDictionaries?: DataDictionaryConfig[];
  dataSource: DataSourceConfig;
  enableEntitiesView?: boolean; // Toggle entities view - list or filter summary
  entities: EntityConfig[];
  export?: ExportConfig;
  exportsRequireAuth?: boolean;
  exportToTerraUrl?: string; // TODO(cc) revist location; possibly nest inside "export"?
  filterSort?: FilterSortConfig;
  gitHubUrl?: string;
  layout: {
    floating?: FloatingConfig;
    footer: FooterProps;
    header: HeaderProps;
  };
  redirectRootToPath: string;
  summaryConfig?: SummaryConfig;
  systemStatus?: SystemStatusConfig;
  themeOptions?: ThemeOptions;
  trackingConfig?: TrackingConfig;
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
  mapResponse: (response: AzulSummaryResponse) => [string, string][];
}

/**
 * System status bind response function.
 */
export type SystemStatusBindResponseFn = <R>(
  response?: R,
) => SystemStatusResponse | undefined;

/**
 * System status endpoint.
 */
export interface SystemStatusConfig {
  apiPath: string;
  bindResponse: SystemStatusBindResponseFn;
}

/**
 * Interface used to define the tab label and route.
 */
export interface TabConfig {
  label: ReactNode;
  route: string;
  tabIcon?: MTabProps["icon"];
  tabIconPosition?: MTabProps["iconPosition"];
  tabName?: string; // Used by the entity view to generate a title for the <Head> component; when label is not typed string.
}

/**
 * Theme options function.
 * Defines theme options, and provides a reference to the specified theme.
 */
export type ThemeOptionsFn = (theme: Theme) => ThemeOptions;

/**
 * View context.
 */
export interface ViewContext<T extends RowData, TData = unknown> {
  authState: Pick<AuthState, "isAuthenticated">;
  cellContext?: CellContext<T, TData>;
  entityConfig: EntityConfig;
  exploreState: ExploreState;
  fileManifestState: FileManifestState;
  systemStatus: SystemStatus;
  tableInstance?: Table<T>;
}

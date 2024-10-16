// eslint-disable-next-line @typescript-eslint/no-explicit-any -- We can't determine the data layer type.
export type DataLayer = any;

/**
 * Set of analytics event actions.
 */
export enum EVENT_NAME {
  BULK_DOWNLOAD_REQUESTED = "bulk_download_requested",
  ENTITY_SELECTED = "entity_selected",
  ENTITY_TABLE_PAGINATED = "entity_table_paginated",
  ENTITY_TABLE_SORTED = "entity_table_sorted",
  FILTER_SELECTED = "filter_selected",
  INDEX_ANALYZE_IN_TERRA_REQUESTED = "index_analyze_in_terra_requested",
  INDEX_FILE_MANIFEST_REQUESTED = "index_file_manifest_requested",
}

/**
 * Set of analytics event parameters.
 */
export enum EVENT_PARAM {
  COLUMN_NAME = "column_name",
  ENTITY_NAME = "entity_name",
  FILTER_NAME = "filter_name",
  FILTER_VALUE = "filter_value",
  PAGINATION_DIRECTION = "pagination_direction",
  SORT_DIRECTION = "sort_direction",
  TOOL_NAME = "tool_name",
}

/**
 * Set of analytics pagination direction values.
 */
export enum PAGINATION_DIRECTION {
  NEXT = "next",
  PREV = "prev",
}

/**
 * Set of analytics sort direction values.
 */
export enum SORT_DIRECTION {
  ASC = "asc",
  DESC = "desc",
}

/**
 * Model of event parameters mapped to the event name.
 */
export type EventParams = {
  [EVENT_NAME.BULK_DOWNLOAD_REQUESTED]: {
    [EVENT_PARAM.ENTITY_NAME]: string;
    [EVENT_PARAM.TOOL_NAME]: string;
  };
  [EVENT_NAME.ENTITY_SELECTED]: { [EVENT_PARAM.ENTITY_NAME]: string };
  [EVENT_NAME.ENTITY_TABLE_PAGINATED]: {
    [EVENT_PARAM.ENTITY_NAME]: string;
    [EVENT_PARAM.PAGINATION_DIRECTION]: PAGINATION_DIRECTION;
  };
  [EVENT_NAME.ENTITY_TABLE_SORTED]: {
    [EVENT_PARAM.ENTITY_NAME]: string;
    [EVENT_PARAM.COLUMN_NAME]: string;
    [EVENT_PARAM.SORT_DIRECTION]: SORT_DIRECTION;
  };
  [EVENT_NAME.FILTER_SELECTED]: {
    [EVENT_PARAM.FILTER_NAME]: string;
    [EVENT_PARAM.FILTER_VALUE]: string;
  };
  [EVENT_NAME.INDEX_ANALYZE_IN_TERRA_REQUESTED]: {
    [EVENT_PARAM.ENTITY_NAME]: string;
  };
  [EVENT_NAME.INDEX_FILE_MANIFEST_REQUESTED]: {
    [EVENT_PARAM.ENTITY_NAME]: string;
  };
};

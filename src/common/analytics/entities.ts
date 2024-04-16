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
}

/**
 * Set of analytics event parameters.
 */
export enum EVENT_PARAM {
  CATALOG = "catalog",
  COLUMN_NAME = "column_name",
  CURRENT_QUERY = "current_query",
  ENTITY_NAME = "entity_name",
  ENTITY_TYPE = "entity_type",
  FILTER_NAME = "filter_name",
  FILTER_VALUE = "filter_value",
  INDEX = "index",
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
    [EVENT_PARAM.CATALOG]: string;
    [EVENT_PARAM.CURRENT_QUERY]: string;
    [EVENT_PARAM.ENTITY_TYPE]: string;
    [EVENT_PARAM.INDEX]: string;
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
};

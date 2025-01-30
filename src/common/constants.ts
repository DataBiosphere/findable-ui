/**
 * Case insensitive sorter
 */
export const COLLATOR_CASE_INSENSITIVE = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

/**
 * Values to determine the index for each param.
 * https://host/explore/[slug]/[param-uuid]/[param-tab]
 * - ExploreView 0 returns the current UUID
 * - ExploreView 1 returns the current tab (or choose export)
 * - ExportView 2 returns the export method
 */
export const PARAMS_INDEX_UUID = 0;
export const PARAMS_INDEX_TAB = 1; // Note "export" (i.e. not a tab) can possibly be at this index too
export const PARAMS_INDEX_EXPORT_METHOD = 2;

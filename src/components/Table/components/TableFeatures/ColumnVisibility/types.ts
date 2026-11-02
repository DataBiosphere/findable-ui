/**
 * Column visibility reset option added to the TanStack table options.
 */
export interface ColumnVisibilityResetOptions {
  /**
   * Called in place of resetting to the table's initial column visibility, for a table whose initial visibility is held
   * elsewhere, e.g. by explore state for each entity.
   */
  onColumnVisibilityReset?: () => void;
}

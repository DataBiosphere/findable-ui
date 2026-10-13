/**
 * Row position options added to the TanStack table options.
 */
export interface RowPositionOptions {
  enableRowPosition?: boolean;
}

/**
 * Row position API added to the TanStack row.
 */
export interface RowPositionRow {
  getRowPosition: () => number;
}

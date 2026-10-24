/**
 * Row virtualizer options shared by the page and box scroll modes: rows are
 * estimated at 56px until measured, with a 1px gap between them.
 */
export const VIRTUALIZER_OPTIONS = {
  estimateSize: (): number => 56,
  gap: 1,
  overscan: 20,
};

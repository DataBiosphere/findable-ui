import type { CategoryConfig } from "../../../../../../../common/categories/config/types";
import type { SelectCategoryValueView } from "../../../../../../../common/entities";
import type { FILTER_SORT } from "../../../../../../../common/filters/sort/config/types";
import { getFilterSortFn } from "../../../../../../../common/filters/sort/models/utils";
import { COLUMNS, COUNTS, LABELS, PINNED_KEYS } from "./constants";
import type { Row } from "./types";

/**
 * Builds category configs for the story columns, mapping the pinned terms to their labels.
 * @returns Category configs.
 */
export function buildCategoryConfigs(): CategoryConfig[] {
  return COLUMNS.map(({ header, id }) => ({
    key: String(id),
    label: String(header),
    mapSelectCategoryValue: mapLabel,
  }));
}

/**
 * Builds the story rows from the value counts, pairing the nth assay with the nth organ.
 * @returns Rows.
 */
export function buildRows(): Row[] {
  const assays = expandCounts(COUNTS.assay);
  const organs = expandCounts(COUNTS.organ);
  return assays.map((assay, i) => ({ assay, organ: organs[i] }));
}

/**
 * Expands a count by term into a list with each term repeated by its count.
 * @param counts - Count by term.
 * @returns Terms.
 */
function expandCounts(counts: Record<string, number>): string[] {
  return Object.entries(counts).flatMap(([term, count]) =>
    Array.from({ length: count }, () => term),
  );
}

/**
 * Maps a pinned term to its label.
 * @param value - Select category value view.
 * @returns The value view with its label.
 */
function mapLabel(value: SelectCategoryValueView): SelectCategoryValueView {
  return { ...value, label: LABELS[value.label] ?? value.label };
}

/**
 * Story comparator that lists the pinned terms last and sorts the other values with the built-in comparator for the sort.
 * @param cvv0 - First category value view to compare.
 * @param cvv1 - Second category value view to compare.
 * @param sortBy - Current filter sort.
 * @returns Number indicating sort precedence of cvv0 vs cvv1.
 */
export function pinLastCompare(
  cvv0: SelectCategoryValueView,
  cvv1: SelectCategoryValueView,
  sortBy: FILTER_SORT,
): number {
  return (
    pinRank(cvv0.key) - pinRank(cvv1.key) || getFilterSortFn(sortBy)(cvv0, cvv1)
  );
}

/**
 * Returns a key's rank: 0 for an unpinned key, otherwise its position in the pinned keys, from 1.
 * @param key - Category value key.
 * @returns Rank.
 */
function pinRank(key: unknown): number {
  return PINNED_KEYS.indexOf(String(key)) + 1;
}

import { createColumnHelper } from "@tanstack/react-table";
import type { Row } from "./types";

const COLUMN_HELPER = createColumnHelper<Row>();

/**
 * Filterable story columns.
 */
export const COLUMNS = [
  COLUMN_HELPER.accessor("assay", {
    filterFn: "arrIncludesSome",
    header: "Assay",
    id: "assay",
  }),
  COLUMN_HELPER.accessor("organ", {
    filterFn: "arrIncludesSome",
    header: "Organ",
    id: "organ",
  }),
];

/**
 * Value count by column and term; each column's counts total the number of rows. Without a comparator, "unspecified" and "not_applicable" are not last in either sort; organ has only "unspecified".
 */
export const COUNTS: Record<keyof Row, Record<string, number>> = {
  assay: {
    "ATAC-seq": 20,
    "RNA-seq": 30,
    WGS: 10,
    not_applicable: 15,
    unspecified: 40,
  },
  organ: { Brain: 50, Heart: 20, Uterus: 15, unspecified: 30 },
};

/**
 * Display labels of the pinned terms.
 */
export const LABELS: Record<string, string> = {
  not_applicable: "Not applicable",
  unspecified: "Unspecified",
};

/**
 * Terms listed last by the story comparator, in this order.
 */
export const PINNED_KEYS = ["unspecified", "not_applicable"];

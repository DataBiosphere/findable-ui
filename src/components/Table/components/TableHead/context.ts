import { createContext } from "react";
import type { TableHeadContextValue } from "./types";

/**
 * Context for the controls rendered in a column head, e.g. sort labels and the
 * select-all checkbox. The pinned copy of the head provides a tab index of -1,
 * so its controls stay clickable but out of the tab order; header renderers can
 * read it too.
 */
export const TableHeadContext = createContext<TableHeadContextValue>({});

/**
 * Value for the pinned copy of the column head.
 */
export const STICKY_HEAD_CONTEXT_VALUE: TableHeadContextValue = {
  tabIndex: -1,
};

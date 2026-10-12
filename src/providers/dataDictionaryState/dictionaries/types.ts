import { TableState } from "@tanstack/react-table";
import { NextRouter } from "next/router";

/**
 * Table state and router query for each data dictionary, keyed by dictionary.
 */
export interface DictionariesContext {
  [key: string]: DictionaryContext;
}

/**
 * Table state and router query for a single data dictionary.
 */
export interface DictionaryContext {
  query: NextRouter["query"];
  state: Partial<TableState>;
}

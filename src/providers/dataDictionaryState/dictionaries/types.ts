import { TableState } from "@tanstack/react-table";
import { NextRouter } from "next/router";

export interface DictionariesContext {
  [key: string]: DictionaryContext;
}

export interface DictionaryContext {
  query: NextRouter["query"];
  state: Partial<TableState>;
}

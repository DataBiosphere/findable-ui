import { ColumnFilter } from "@tanstack/react-table";
import { Dispatch } from "react";
import { DataDictionaryAction } from "./actions/types";

export interface DataDictionaryState {
  columnFilters: ColumnFilter[];
}

export interface DataDictionaryStateContextProps {
  dataDictionaryDispatch: Dispatch<DataDictionaryAction> | null;
  dataDictionaryState: DataDictionaryState;
}

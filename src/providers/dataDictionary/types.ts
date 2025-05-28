import { ColumnFilter } from "@tanstack/react-table";
import { Dispatch } from "react";
import { Meta } from "../dataDictionaryMeta/types";
import { DataDictionaryAction } from "./actions/types";

export interface DataDictionaryState {
  columnFilters: ColumnFilter[];
  meta: Meta | null;
}

export interface DataDictionaryStateContextProps {
  dataDictionaryDispatch: Dispatch<DataDictionaryAction> | null;
  dataDictionaryState: DataDictionaryState;
}

import { TableState } from "@tanstack/react-table";
import { TableStateKeys } from "../../state/tables/types";

export interface UseTableState {
  state: Pick<TableState, TableStateKeys>;
}

import { Updater } from "@tanstack/react-table";
import { DataDictionaryActionKind } from "../types";

export type UpdateGlobalFilterAction = {
  payload: UpdateGlobalFilterPayload;
  type: DataDictionaryActionKind.UpdateGlobalFilter;
};

export interface UpdateGlobalFilterPayload {
  dictionary: string;
  updaterOrValue: Updater<string | undefined>;
}

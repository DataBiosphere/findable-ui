import { RowData, Table } from "@tanstack/react-table";
import { Attribute } from "../../../../common/entities";
import { OutlineItem } from "../../../Layout/components/Outline/types";

export interface UseDataDictionary<T extends RowData = Attribute> {
  outline: OutlineItem[];
  table: Table<T>;
  title: string;
}

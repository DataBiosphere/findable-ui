import { ColumnDef } from "@tanstack/react-table";
import { Attribute, AttributeValue, Class } from "../../../../common/entities";

export interface UseDataDictionary {
  classes: Class[];
  columnDefs: ColumnDef<Attribute, AttributeValue>[];
}

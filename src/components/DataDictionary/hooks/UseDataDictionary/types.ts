import { ColumnDef } from "@tanstack/react-table";
import {
  Attribute,
  AttributeValueTypes,
  Class,
} from "../../../../common/entities";

export interface UseDataDictionary {
  classes: Class[];
  columnDefs: ColumnDef<Attribute, AttributeValueTypes>[];
}
